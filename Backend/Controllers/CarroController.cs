using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;

[Route("[controller]")]
[ApiController]
public class CarroController : ControllerBase
{
    private AppDbContext _dbContext;

    public CarroController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet()]
    [Route("listar")]
    public async Task<ActionResult<IEnumerable<Carro>>> ListarCarros()
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Carros is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        var carrosComNomeCliente = await _dbContext.Carros
        .Select(c => new
        {
            c.Placa,
            c.Modelo,
            c.Cor,
            NomeCliente = _dbContext.Clientes.FirstOrDefault(cli => cli.Cpf == c.Cliente_Cpf).Nome
        })
        .ToListAsync();

        if(carrosComNomeCliente is null){
            return NotFound("Lista vazia");
        }

        return Ok(carrosComNomeCliente);
    }

    [HttpGet()]
    [Route("buscar/{placa}")]
    public async Task<IActionResult> BuscarCarros(string placa)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Carros is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        var carroComNomeCliente = await _dbContext.Carros
        .Where(c => c.Placa == placa)
        .Select(c => new
        {
            c.Placa,
            c.Modelo,
            c.Cor,
            cliente_cpf = c.Cliente_Cpf,
            NomeCliente = _dbContext.Clientes.FirstOrDefault(cli => cli.Cpf == c.Cliente_Cpf).Nome
        })
        .FirstOrDefaultAsync();

        if (carroComNomeCliente == null)
        {
            return NotFound("Carro não encontrado.");
        }

        return Ok(carroComNomeCliente);
    }

    [HttpPost()]
    [Route("cadastrar/{cpf}")]
    public async Task<IActionResult> CadastrarCarro(string cpf, [FromBody] Carro novoCarro)
    {
        if(_dbContext is null) 
            return NotFound("DB Context NULO");

        if(_dbContext.Clientes is null) 
            return NotFound("DB Context Clientes NULO");

        var cliente = await _dbContext.Clientes.Include(c => c.Carros)
                                               .FirstOrDefaultAsync(c => c.Cpf == cpf);

        if (cliente == null)
        {
            return NotFound("Cliente não encontrado.");
        }

        if(cliente.Carros is null) 
            return NotFound();

        var carroExistente = cliente.Carros.FirstOrDefault(c => c.Placa == novoCarro.Placa);

        if (carroExistente != null)
        {
            return BadRequest("O carro já está na lista do cliente.");
        }

        if(novoCarro == null){
            return BadRequest("Os dados do carro devem ser preenchidos!");
        }

        Console.WriteLine(novoCarro);

        cliente.Carros.Add(novoCarro);
        _dbContext.Entry(cliente).State = EntityState.Modified;

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok("Carro adicionado ao cliente com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao adicionar o carro ao cliente.");
        }
    }

    [HttpPut]
    [Route("editar/{placa}")]
    public async Task<ActionResult> AtualizarCarro(string placa, [FromBody] Carro novoCarro)
    {
        if (_dbContext is null || _dbContext.Carros is null)
            return NotFound();

        var carro = await _dbContext.Carros.FirstOrDefaultAsync(c => c.Placa == placa);

        if (carro == null)
        {
            return NotFound("Carro não encontrado.");
        }

        // Atualize as propriedades do carro existente com as do novoCarro
        carro.Placa = novoCarro.Placa;
        carro.Modelo = novoCarro.Modelo;
        carro.Cor = novoCarro.Cor;
        carro.Cliente_Cpf = carro.Cliente_Cpf;

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao atualizar o carro.");
        }
    }

    [HttpPatch()]
    [Route("alterarPlaca/{placa}")]
    public async Task<IActionResult> AlterarPlaca(string placa, string novaPlaca)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Carros is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();
    
        var carro = await _dbContext.Carros.FirstOrDefaultAsync(c => c.Placa == placa);

        if (carro == null)
        {
            return NotFound("Carro não encontrado.");
        }

        // Crie um novo objeto Carro com a nova placa
        var novoCarro = new Carro
        {
            Placa = novaPlaca,
            Modelo = carro.Modelo,
            Cor = carro.Cor,
            Cliente_Cpf = carro.Cliente_Cpf
        };

        // Adicione o novo carro ao cliente
        var cliente = await _dbContext.Clientes.Include(c => c.Carros)
                                            .FirstOrDefaultAsync(c => c.Cpf == carro.Cliente_Cpf);

        cliente.Carros.Add(novoCarro);

        // Remova o carro original
        _dbContext.Carros.Remove(carro);

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok("Placa do carro alterada com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao alterar a placa do carro.");
        }
    }

    [HttpPatch()]
    [Route("alterarCor/{placa}")]
    public async Task<IActionResult> AlterarCor(string placa, string novaCor)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Carros is null) 
            return NotFound();

        var carro = await _dbContext.Carros.FirstOrDefaultAsync(c => c.Placa == placa);

        if (carro == null)
        {
            return NotFound("Carro não encontrado.");
        }

        carro.Cor = novaCor;
        _dbContext.Entry(carro).State = EntityState.Modified;

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok("Cor do carro alterada com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao alterar a cor do carro.");
        }
    }

    [HttpDelete()]
    [Route("deletar/{placa}")]
    public async Task<IActionResult> DeletarCarro(string placa)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Carros is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();


        var carro = await _dbContext.Carros.FirstOrDefaultAsync(c => c.Placa == placa);

        if (carro == null)
        {
            return NotFound("Carro não encontrado.");
        }

        var cliente = await _dbContext.Clientes.Include(c => c.Carros)
                                               .FirstOrDefaultAsync(c => c.Carros.Any(car => car.Placa == placa));

        if (cliente != null)
        {
            cliente.Carros.Remove(carro);
            _dbContext.Entry(cliente).State = EntityState.Modified;
        }

        _dbContext.Carros.Remove(carro);

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok("Carro excluído com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao excluir o carro.");
        }
    }
}

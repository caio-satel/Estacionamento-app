using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("[controller]")]
[ApiController]
public class ServicoExtraController : ControllerBase
{
    private AppDbContext _dbContext;

    public ServicoExtraController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet()]
    [Route("listarServicosExtra")]
    public async Task<IActionResult> ListarServicosExtra()
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.ServicoExtras is null) 
            return NotFound();

        if(_dbContext.Clientes is null)
            return NotFound();

        if(_dbContext.Carros is null)
            return NotFound();

        if(_dbContext.Funcionarios is null)
            return NotFound();

        try
        {
            var servicos = await _dbContext.ServicoExtras.ToListAsync();

            var resultado = servicos.Select(s => new
            {
                s.ServicoId,
                s.Descricao,
                s.Custo,
                Cliente = new
                {
                    _dbContext.Clientes.FirstOrDefault(cliente => cliente.Cpf == s.Cliente_Cpf)?.Nome,
                    s.Cliente_Cpf
                },
                Carro = new
                {
                    _dbContext.Carros.FirstOrDefault(carro => carro.Placa == s.Carro_Placa)?.Modelo,
                    s.Carro_Placa
                },
                Funcionario = _dbContext.Funcionarios.FirstOrDefault(funcionario => funcionario.IdFuncionario == s.Funcionario_Id)?.Nome,
            });

            return Ok(resultado);
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao listar os serviços extras.");
        }
    }

    [HttpGet()]
    [Route("listarServicoCliente/{cpf}")]
    public async Task<IActionResult> ListarServicoCliente(string cpf)
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.ServicoExtras is null) 
            return NotFound();

        if(_dbContext.Clientes is null)
            return NotFound();

        if(_dbContext.Carros is null)
            return NotFound();

        if(_dbContext.Funcionarios is null)
            return NotFound();

        try
        {
            var cliente = await _dbContext.Clientes.FirstOrDefaultAsync(c => c.Cpf == cpf);

            if (cliente == null)
            {
                return NotFound("Cliente não encontrado.");
            }

            var servicos = await _dbContext.ServicoExtras
                .Where(s => s.Cliente_Cpf == cpf)
                .ToListAsync();

            var resultado = servicos.Select(s => new
            {
                s.ServicoId,
                s.Descricao,
                s.Custo,
                Carro = new
                {
                    _dbContext.Carros.FirstOrDefault(carro => carro.Placa == s.Carro_Placa)?.Modelo,
                    _dbContext.Carros.FirstOrDefault(carro => carro.Placa == s.Carro_Placa)?.Placa,
                },
                Funcionario = _dbContext.Funcionarios.FirstOrDefault(funcionario => funcionario.IdFuncionario == s.Funcionario_Id)?.Nome,
            });

            return Ok(resultado);
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao listar os serviços do cliente.");
        }
    }

    [HttpPost()]
    [Route("registrarServico")]
    public async Task<IActionResult> RegistrarServico([FromBody] ServicoExtra novoServico)
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.ServicoExtras is null) 
            return NotFound();

        try
        {
            if (ModelState.IsValid)
            {
                _dbContext.ServicoExtras.Add(novoServico);
                await _dbContext.SaveChangesAsync();
                return Ok("Serviço registrado com sucesso.");
            }
            else
            {
                return BadRequest("Dados inválidos para registrar o serviço.");
            }
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao registrar o serviço.");
        }
    }

    [HttpPut()]
    [Route("atualizarServico/{ServicoId}")]
    public async Task<IActionResult> AtualizarServico([FromBody] ServicoExtra servicoAtualizado)
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.ServicoExtras is null) 
            return NotFound();
        
        try
        {
            var servicoExistente = await _dbContext.ServicoExtras.FindAsync(servicoAtualizado.ServicoId);

            if (servicoExistente == null)
            {
                return NotFound("Serviço não encontrado.");
            }

            if (servicoExistente.Cliente_Cpf != servicoAtualizado.Cliente_Cpf)
            {
                return BadRequest("Cliente associado ao serviço não pode ser alterado.");
            }

            if (servicoAtualizado.Custo <= 0)
            {
                return BadRequest("O custo do serviço deve ser maior que zero.");
            }

            servicoExistente.Descricao = servicoAtualizado.Descricao;
            servicoExistente.Custo = servicoAtualizado.Custo;

            _dbContext.Entry(servicoExistente).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return Ok("Serviço atualizado com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao atualizar o serviço.");
        }
    }

    [HttpDelete()]
    [Route("deletarServico/{ServicoId}")]
    public async Task<IActionResult> DeletarServico(int ServicoId)
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.ServicoExtras is null) 
            return NotFound();

        try
        {
            var servicoExistente = await _dbContext.ServicoExtras.FindAsync(ServicoId);

            if (servicoExistente == null)
            {
                return NotFound("Serviço não encontrado.");
            }

            _dbContext.ServicoExtras.Remove(servicoExistente);
            await _dbContext.SaveChangesAsync();

            return Ok("Serviço deletado com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao deletar o serviço.");
        }
    }
}

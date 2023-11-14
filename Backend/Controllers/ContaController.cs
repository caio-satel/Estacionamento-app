using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class ContaController : ControllerBase
{
    private AppDbContext _dbContext;

    public ContaController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet()]
    [Route("listarContas")]
    public async Task<ActionResult<Conta>> ListarContas()
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.Contas is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        try
        {
            var contas = await _dbContext.Contas
                .ToListAsync();

            var resultado = contas.Select(c => new
            {
                c.IdConta,
                c.Total_gasto,
                Cliente = new
                {
                    _dbContext.Clientes.FirstOrDefault(cliente => cliente.Cpf == c.Cliente_Cpf)?.Nome,
                    c.Cliente_Cpf
                }
            });

            return Ok(resultado);
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao listar as contas.");
        }
    }

    [HttpGet()]
    [Route("listarContaClienteEspecifico/{cpf}")]
    public async Task<IActionResult> ListarContaClienteEspecifico(string cpf)
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.Contas is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        try
        {
            var cliente = await _dbContext.Clientes.FirstOrDefaultAsync(c => c.Cpf == cpf);

            if (cliente == null)
            {
                return NotFound("Cliente não encontrado.");
            }

            var conta = await _dbContext.Contas.FirstOrDefaultAsync(c => c.Cliente_Cpf == cliente.Cpf);

            if (conta == null)
            {
                return NotFound("Conta não encontrada para este cliente.");
            }

            var resultado = new
            {
                conta.IdConta,
                conta.Total_gasto,
                Cliente = new
                {
                    cliente.Nome,
                    cliente.Cpf
                }
            };

            return Ok(resultado);
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao listar a conta do cliente.");
        }
    }

    [HttpPost()]
    [Route("criarConta")]
    public async Task<ActionResult<Conta>> CriarConta([FromBody] Conta novaConta)
    {
        if(_dbContext is null)
            return NotFound();
        
        if(_dbContext.Clientes is null)
            return NotFound();

        if(_dbContext.Contas is null)
            return NotFound();

        try
        {
            if (novaConta == null)
            {
                return BadRequest("Os dados da conta não foram fornecidos.");
            }

            var cliente = await _dbContext.Clientes.FirstOrDefaultAsync(c => c.Cpf == novaConta.Cliente_Cpf);

            if (cliente == null)
            {
                return NotFound("Cliente não encontrado. A conta só pode ser criada para um cliente existente.");
            }

            if (ModelState.IsValid)
            {
                _dbContext.Contas.Add(novaConta);
                await _dbContext.SaveChangesAsync();

                return Ok("Conta criada com sucesso.");
            }
            else
            {
                return BadRequest("Dados inválidos para criar a conta.");
            }
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao criar a conta.");
        }
    }


    [HttpPatch()]
    [Route("alterarTotal/{cpf}")]
    public async Task<IActionResult> AlterarTotal(string cpf, [FromForm] float novoTotal)
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.Contas is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        try
        {
            var cliente = await _dbContext.Clientes.FirstOrDefaultAsync(c => c.Cpf == cpf);

            if (cliente == null)
            {
                return NotFound("Cliente não encontrado. A conta só pode ser alterada para um cliente existente.");
            }

            var conta = await _dbContext.Contas.FirstOrDefaultAsync(c => c.Cliente_Cpf == cpf);

            if (conta == null)
            {
                return NotFound("Conta não encontrada para o cliente especificado.");
            }

            conta.Total_gasto = novoTotal;
            _dbContext.Entry(conta).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return Ok("Total da conta alterado com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao alterar o total da conta.");
        }
    }


    [HttpDelete("deletarConta/{cpf}")]
    public async Task<IActionResult> DeletarConta(string cpf)
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.Contas is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        try
        {
            var cliente = await _dbContext.Clientes.FirstOrDefaultAsync(c => c.Cpf == cpf);

            if (cliente == null)
            {
                return NotFound("Cliente não encontrado.");
            }

            var conta = await _dbContext.Contas.FirstOrDefaultAsync(c => c.Cliente_Cpf == cliente.Cpf);

            if (conta == null)
            {
                return NotFound("Conta não encontrada para este cliente.");
            }

            _dbContext.Contas.Remove(conta);
            await _dbContext.SaveChangesAsync();

            return Ok("Conta do cliente removida com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao remover a conta do cliente.");
        }
    }
}

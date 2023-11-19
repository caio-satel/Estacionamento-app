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

    [HttpGet]
[Route("buscarConta/{idConta}")]
public async Task<ActionResult<Conta>> BuscarConta(int idConta)
{
    if (_dbContext is null)
        return NotFound();

    if (_dbContext.Contas is null)
        return NotFound();

    if (_dbContext.Clientes is null)
        return NotFound();

    try
    {
        var conta = await _dbContext.Contas
            .FirstOrDefaultAsync(c => c.IdConta == idConta);

        if (conta == null)
            return NotFound($"Conta com IdConta {idConta} não encontrada.");

        var resultado = await _dbContext.Contas
        .Where(c => c.IdConta == idConta)
        .Select(c => new
        {
            c.IdConta,
            c.Total_gasto,
            cliente_cpf = c.Cliente_Cpf,
            NomeCliente = _dbContext.Clientes.FirstOrDefault(cli => cli.Cpf == c.Cliente_Cpf).Nome
        })
        .FirstOrDefaultAsync();

        return Ok(resultado);
    }
    catch (Exception)
    {
        return StatusCode(500, "Erro ao buscar a conta.");
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


[HttpPut]
[Route("atualizarConta/{idConta}")]
public async Task<IActionResult> AtualizarConta(int idConta, [FromBody] Conta novaConta)
{
    if (_dbContext is null)
        return NotFound();

    if (_dbContext.Contas is null)
        return NotFound();

    if (_dbContext.Clientes is null)
        return NotFound();

    try
    {
        var conta = await _dbContext.Contas.FirstOrDefaultAsync(c => c.IdConta == idConta);

        if (conta == null)
        {
            return NotFound($"Conta com IdConta {idConta} não encontrada.");
        }

        // Verifique se o cliente existe (opcional, dependendo dos requisitos do seu sistema)
        var cliente = await _dbContext.Clientes.FirstOrDefaultAsync(c => c.Cpf == novaConta.Cliente_Cpf);
        if (cliente == null)
        {
            return NotFound("Cliente não encontrado. A conta só pode ser atualizada para um cliente existente.");
        }

        // Atualize as propriedades da conta com base nos dados fornecidos
        conta.Total_gasto = novaConta.Total_gasto;
        // Você pode atualizar outras propriedades da conta conforme necessário

        // Marque a entidade como modificada e salve as alterações
        _dbContext.Entry(conta).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();

        return Ok("Conta atualizada com sucesso.");
    }
    catch (Exception)
    {
        return StatusCode(500, "Erro ao atualizar a conta.");
    }
}

[HttpDelete()]
[Route("deletarConta/{idConta}")]
public async Task<IActionResult> DeletarConta(int idConta)
{
    if (_dbContext is null)
        return NotFound();

    if (_dbContext.Contas is null)
        return NotFound();

    if (_dbContext.Clientes is null)
        return NotFound();

    try
    {
        var conta = await _dbContext.Contas.FirstOrDefaultAsync(c => c.IdConta == idConta);

        if (conta == null)
        {
            return NotFound($"Conta com IdConta {idConta} não encontrada.");
        }

        // Você pode verificar se o cliente existe, se necessário
        var cliente = await _dbContext.Clientes.FirstOrDefaultAsync(c => c.Cpf == conta.Cliente_Cpf);
        if (cliente == null)
        {
            return NotFound("Cliente não encontrado para a conta especificada.");
        }

        _dbContext.Contas.Remove(conta);
        await _dbContext.SaveChangesAsync();

        return Ok("Conta removida com sucesso.");
    }
    catch (Exception)
    {
        return StatusCode(500, "Erro ao remover a conta.");
    }
}
}

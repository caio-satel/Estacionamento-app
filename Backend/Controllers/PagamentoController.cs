using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("[controller]")]
[ApiController]
public class PagamentoController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    public PagamentoController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet()]
    [Route("listarPagamentos")]
    public async Task<ActionResult<Pagamento>> ListarPagamentos()
    {
        if(_dbContext is null)
            return NotFound();
        
        if(_dbContext.Pagamentos is null)
            return NotFound();

        if(_dbContext.Contas is null)
            return NotFound();

        if(_dbContext.Tickets is null)
            return NotFound();

        try
        {
            var pagamentos = await _dbContext.Pagamentos.ToListAsync();

            var resultado = pagamentos.Select(p => new
            {
                p.Codigo,
                Data_hora_pagamento = DateTime.Now,
                Ticket = new
                {
                    ValorPago = _dbContext.Tickets.FirstOrDefault(t => t.Codigo == p.Codigo_Ticket)?.Total,
                },

                _dbContext.Contas.FirstOrDefault(c => c.IdConta == p.Conta_Id)?.Cliente_Cpf,
                
            });

            return Ok(resultado);
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao listar os pagamentos.");
        }
    }

    [HttpPost()]
    [Route("registrarPagamento")]
    public async Task<ActionResult<Pagamento>> RegistrarPagamento([FromBody] Pagamento novoPagamento)
    {
        if(_dbContext is null)
            return NotFound();
        
        if(_dbContext.Pagamentos is null)
            return NotFound();

        if(_dbContext.Tickets is null)
            return NotFound();

        try
        {
            if (ModelState.IsValid)
            {
                // Verifique se o pagamento já existe
                if (_dbContext.Pagamentos.Any(p => p.Codigo == novoPagamento.Codigo))
                {
                    return BadRequest("Pagamento já existe.");
                }

                // Obtenha o Ticket correspondente ao Codigo_Ticket
                var ticket = await _dbContext.Tickets.FirstOrDefaultAsync(t => t.Codigo == novoPagamento.Codigo_Ticket);

                if (ticket == null)
                {
                    return NotFound("Ticket não encontrado.");
                }

                // Configure os campos do pagamento
                novoPagamento.Data_hora_pagamento = DateTime.Now;
                novoPagamento.Valor_pago = ticket.Total;

                _dbContext.Pagamentos.Add(novoPagamento);
                await _dbContext.SaveChangesAsync();

                return Ok("Pagamento registrado com sucesso.");
            }
            else
            {
                return BadRequest("Dados inválidos para registrar o pagamento.");
            }
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao registrar o pagamento.");
        }
    }

    [HttpPut()]
    [Route("alterarPagamento/{id}")]
    public async Task<IActionResult> AlterarPagamento(int id, [FromBody] Pagamento pagamentoAtualizado)
    {
        if(_dbContext is null)
            return NotFound();
        
        if(_dbContext.Pagamentos is null)
            return NotFound();

        try
        {
            var pagamentoExistente = await _dbContext.Pagamentos.FindAsync(id);

            if (pagamentoExistente == null)
            {
                return NotFound("Pagamento não encontrado.");
            }

            // Atualize os campos necessários do pagamentoExistente com os valores de pagamentoAtualizado

            await _dbContext.SaveChangesAsync();

            return Ok("Pagamento atualizado com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao atualizar o pagamento.");
        }
    }

    [HttpDelete()]
    [Route("deletarPagamento/{id}")]
    public async Task<IActionResult> DeletarPagamento(int id)
    {
        if(_dbContext is null)
            return NotFound();
        
        if(_dbContext.Pagamentos is null)
            return NotFound();
        
        try
        {
            var pagamentoExistente = await _dbContext.Pagamentos.FindAsync(id);

            if (pagamentoExistente == null)
            {
                return NotFound("Pagamento não encontrado.");
            }

            _dbContext.Pagamentos.Remove(pagamentoExistente);
            await _dbContext.SaveChangesAsync();

            return Ok("Pagamento removido com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao remover o pagamento.");
        }
    }
}

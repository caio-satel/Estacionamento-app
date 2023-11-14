using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("[controller]")]
[ApiController]
public class TicketController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public TicketController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet()]
    [Route("listarTickets")]
    public async Task<IActionResult> ListarTickets()
    {
        if(_dbContext is null)
            return NotFound();
        
        if(_dbContext.Tickets is null)
            return NotFound();

        try
        {
            var tickets = await _dbContext.Tickets.ToListAsync();

            if (tickets == null || tickets.Count == 0)
            {
                return NotFound("Nenhum ticket encontrado.");
            }

            return Ok(tickets);
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao listar os tickets.");
        }
    }

    [HttpPost()]
    [Route("criarTicket")]
    public async Task<IActionResult> CriarTicket([FromBody] Ticket novoTicket)
    {
        if(_dbContext is null)
            return NotFound();
        
        if(_dbContext.Tickets is null)
            return NotFound();

        if(_dbContext.RegistroEntradasSaidas is null)
            return NotFound();

        try
        {
            // Verifique se o carro está no estacionamento
            var registroEntradaSaida = await _dbContext.RegistroEntradasSaidas
                .FirstOrDefaultAsync(r => r.Carro_Placa == novoTicket.Carro_Placa);

            if (registroEntradaSaida != null && registroEntradaSaida.DataSaida == null)
            {
                return BadRequest("O carro ainda está no estacionamento.");
            }

            if (registroEntradaSaida != null &&
                registroEntradaSaida.DataEntrada.HasValue &&
                registroEntradaSaida.DataSaida.HasValue)
            {
                novoTicket.Data_hora_entrada = registroEntradaSaida.DataEntrada;
                novoTicket.Data_hora_saida = registroEntradaSaida.DataSaida;

                // Calcule o valor total (substitua a lógica pelo cálculo real)
                novoTicket.Total = CalcularValorTotal();

                _dbContext.Tickets.Add(novoTicket);
                await _dbContext.SaveChangesAsync();

                return Ok("Ticket criado com sucesso.");
            }
            else
            {
                return BadRequest("O registro de entrada/saída não está completo.");
            }
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao criar o ticket.");
        }
    }

    [HttpDelete()]
    [Route("deletarTicket/{Codigo}")]
    public async Task<IActionResult> DeletarTicket(int Codigo)
    {
        if(_dbContext is null)
            return NotFound();

        if(_dbContext.Tickets is null)
            return NotFound();

        try
        {
            var ticket = await _dbContext.Tickets.FindAsync(Codigo);

            if (ticket == null)
            {
                return NotFound("Ticket não encontrado.");
            }

            // Realize outras verificações necessárias antes de excluir o ticket, se houver

            _dbContext.Tickets.Remove(ticket);
            await _dbContext.SaveChangesAsync();

            return Ok("Ticket removido com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao remover o ticket.");
        }
    }

    // Substitua este método pelo cálculo real do valor total do ticket
    private float? CalcularValorTotal()
    {
        // Implemente a lógica real para calcular o valor total do ticket aqui
        return 0;
    }
}

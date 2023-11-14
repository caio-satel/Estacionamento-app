using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ReservaController : ControllerBase
{
    private  AppDbContext _dbContext;

    public ReservaController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet()]
    [Route("listarReservas")]
    public async Task<ActionResult<Reserva>> ListarReservas()
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Reservas is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();

        try
        {
            var reservas = await _dbContext.Reservas
                .ToListAsync();

            var resultado = reservas.Select(r => new
            {
                r.ReservaId,
                r.Data_hora_reserva,
                Cliente = new
                {
                    _dbContext.Clientes.FirstOrDefault(cliente => cliente.Cpf == r.Cliente_Cpf)?.Nome,
                    r.Cliente_Cpf
                },
                Vaga = new
                {
                    _dbContext.Vagas.FirstOrDefault(vaga =>  vaga.VagaId == r.Vaga_Id)?.Tipo,
                    r.Vaga_Id
                },
            });

            return Ok(resultado);
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao listar as reservas.");
        }
    }

    [HttpPost()]
    [Route("cadastrarReserva")]
    public async Task<IActionResult> CadastrarReserva([FromBody] Reserva novaReserva)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Reservas is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();

        try
        {
            var vaga = await _dbContext.Vagas.FirstOrDefaultAsync(v => v.VagaId == novaReserva.Vaga_Id);

            if (vaga == null)
            {
                return BadRequest("A vaga especificada não existe.");
            }

            if (vaga.Ocupada == true)
            {
                return BadRequest("A vaga está ocupada e não pode ser reservada.");
            }

            vaga.Ocupada = true;
            _dbContext.Entry(vaga).State = EntityState.Modified;

            _dbContext.Reservas.Add(novaReserva);
            await _dbContext.SaveChangesAsync();

            return Ok("Reserva cadastrada com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao cadastrar a reserva.");
        }
    }

    [HttpDelete()]
    [Route("removerReserva/{reservaId}")]
    public async Task<IActionResult> RemoverReserva(int reservaId)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Reservas is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();

        try
        {
            var reserva = await _dbContext.Reservas.FirstOrDefaultAsync(r => r.ReservaId == reservaId);

            if (reserva == null)
            {
                return NotFound("Reserva não encontrada.");
            }

            var vaga = await _dbContext.Vagas.FirstOrDefaultAsync(v => v.VagaId == reserva.Vaga_Id);

            if (vaga == null)
            {
                return BadRequest("A vaga da reserva não existe.");
            }

            vaga.Ocupada = false;
            _dbContext.Entry(vaga).State = EntityState.Modified;

            _dbContext.Reservas.Remove(reserva);
            await _dbContext.SaveChangesAsync();

            return Ok("Reserva removida com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao remover a reserva.");
        }
    }
}

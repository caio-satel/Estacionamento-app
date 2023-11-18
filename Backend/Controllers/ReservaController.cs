using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
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

    [HttpGet()]
    [Route("buscarReserva/{reservaId}")]
    public async Task<IActionResult> BuscarReserva(int reservaId)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Reservas is null) 
            return NotFound();


        var reserva = await _dbContext.Reservas
    .Where(r => r.ReservaId == reservaId)
    .Select(r => new
    {
        r.ReservaId,
        r.Data_hora_reserva,
        Cliente = new
        {
            _dbContext.Clientes.FirstOrDefault(cliente => cliente.Cpf == r.Cliente_Cpf).Nome,
            r.Cliente_Cpf
        },
        Vaga = new
        {
            _dbContext.Vagas.FirstOrDefault(vaga => vaga.VagaId == r.Vaga_Id).Tipo,
            r.Vaga_Id
        },
    })
    .FirstOrDefaultAsync();


        if (reserva == null)
        {
            return NotFound("Reserva não encontrada.");
        }

        return Ok(reserva);
    }

    [HttpPost()]
    [Route("cadastrarReserva")]
    public async Task<IActionResult> CadastrarReserva([FromBody] Reserva reserva)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Reservas is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();

        var vaga = await _dbContext.Vagas.FirstOrDefaultAsync(v => v.VagaId == reserva.Vaga_Id);

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

        _dbContext.Reservas.Add(reserva);

        try
        {
            await _dbContext.SaveChangesAsync();

            return Ok("Reserva cadastrada com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao cadastrar a reserva.");
        }
    }

[HttpPut()]
[Route("editar/{reservaId}")]
public async Task<IActionResult> EditarReserva(int reservaId, Reserva novaReserva)
{
    if (_dbContext is null)
        return NotFound();

    if (_dbContext.Reservas is null)
        return NotFound();

            var reserva = await _dbContext.Reservas.FindAsync(reservaId);

        if (reserva == null)
        {
            return NotFound("Reserva não encontrada.");
        }

        reserva.Data_hora_reserva = novaReserva.Data_hora_reserva;
        reserva.Vaga_Id = novaReserva.Vaga_Id;

        _dbContext.Entry(reserva).State = EntityState.Modified;

        await _dbContext.SaveChangesAsync();

        var resultado = new
        {
            reserva.ReservaId,
            reserva.Data_hora_reserva,
            Cliente = new
            {
                _dbContext.Clientes.FirstOrDefault(cliente => cliente.Cpf == reserva.Cliente_Cpf)?.Nome,
                reserva.Cliente_Cpf
            },
            Vaga = new
            {
                _dbContext.Vagas.FirstOrDefault(vaga => vaga.VagaId == reserva.Vaga_Id)?.Tipo,
                reserva.Vaga_Id
            },
        };

    try
    {
        return Ok(resultado);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Erro ao alterar reserva: {ex.Message}");
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

        try
        {
            _dbContext.Reservas.Remove(reserva);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao remover a reserva.");
        }
    }
}

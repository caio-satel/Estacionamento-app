using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("[controller]")]
[ApiController]
public class TarifarioController : ControllerBase
{
    private AppDbContext _dbContext;

    public TarifarioController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet()]
    [Route("listarTarifario")]
    public async Task<ActionResult<Tarifario>> ListarTarifario()
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Tarifarios is null) 
            return NotFound();

        try
        {
            var tarifarios = await _dbContext.Tarifarios.ToListAsync();
            return Ok(tarifarios);
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao listar os tarifários.");
        }
    }

    [HttpPost()]
    [Route("criarTarifario")]
    public async Task<IActionResult> CriarTarifario([FromBody] Tarifario novoTarifario)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Tarifarios is null) 
            return NotFound();

        try
        {
            if (ModelState.IsValid)
            {
                _dbContext.Tarifarios.Add(novoTarifario);
                await _dbContext.SaveChangesAsync();
                return Ok("Tarifário criado com sucesso.");
            }
            else
            {
                return BadRequest("Dados inválidos para criar o tarifário.");
            }
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao criar o tarifário.");
        }
    }

    [HttpPut()]
    [Route("alterarTarifario/{IdTarifario}")]
    public async Task<IActionResult> AlterarTarifario(int IdTarifario, [FromForm] float TarifaHora, [FromForm] float TarifaDiaria, [FromForm] float TarifaMensal)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Tarifarios is null) 
            return NotFound();

        try
        {
            var tarifarioExistente = await _dbContext.Tarifarios.FindAsync(IdTarifario);

            if (tarifarioExistente == null)
            {
                return NotFound("Tarifário não encontrado.");
            }

            tarifarioExistente.Tarifa_hora = TarifaHora;
            tarifarioExistente.Tarifa_diaria = TarifaDiaria;
            tarifarioExistente.Tarifa_mensal = TarifaMensal;

            _dbContext.Entry(tarifarioExistente).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return Ok("Tarifário alterado com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao alterar o tarifário.");
        }
    }

    [HttpDelete()]
    [Route("deletarTarifario/{IdTarifario}")]
    public async Task<IActionResult> DeletarTarifario(int IdTarifario)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Tarifarios is null) 
            return NotFound();

        try
        {
            var tarifarioExistente = await _dbContext.Tarifarios.FindAsync(IdTarifario);

            if (tarifarioExistente == null)
            {
                return NotFound("Tarifário não encontrado.");
            }

            _dbContext.Tarifarios.Remove(tarifarioExistente);
            await _dbContext.SaveChangesAsync();

            return Ok("Tarifário deletado com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao deletar o tarifário.");
        }
    }
}

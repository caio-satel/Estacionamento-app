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

    [HttpGet()]
    [Route("buscar/{idTarifario}")]
    public async Task<IActionResult> Buscar(int idTarifario)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Tarifarios is null) 
            return NotFound();

        var tarifario = await _dbContext.Tarifarios
            .Where(t => t.IdTarifario == idTarifario)
            .FirstOrDefaultAsync();

        return Ok(tarifario);
    }

    [HttpPost()]
    [Route("criarTarifario")]
    public async Task<IActionResult> CriarTarifario(Tarifario novoTarifario)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Tarifarios is null) 
            return NotFound();

        _dbContext.Tarifarios.Add(novoTarifario);

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok(new {mensagem = "Tarifário criado com sucesso."});
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao criar o tarifário.");
        }
    }

    [HttpPut()]
    [Route("alterarTarifario/{IdTarifario}")]
    public async Task<IActionResult> AlterarTarifario(int IdTarifario, Tarifario novoTarifario)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Tarifarios is null) 
            return NotFound();

        var tarifarioExistente = await _dbContext.Tarifarios.FindAsync(IdTarifario);

        if (tarifarioExistente == null)
        {
            return NotFound("Tarifário não encontrado.");
        }

        tarifarioExistente.Tarifa_hora = novoTarifario.Tarifa_hora;
        tarifarioExistente.Tarifa_diaria = novoTarifario.Tarifa_diaria;
        tarifarioExistente.Tarifa_mensal = novoTarifario.Tarifa_mensal;

        try
        {
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

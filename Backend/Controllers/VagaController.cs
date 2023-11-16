using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("[controller]")]
[ApiController]
public class VagaController : ControllerBase
{
    private AppDbContext _dbContext;

    public VagaController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet()]
    [Route("listar")]
    public async Task<IActionResult> Listar()
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();

        var vagas = await _dbContext.Vagas.ToListAsync();
        return Ok(vagas);
    }

    [HttpGet()]
    [Route("buscarVaga/{VagaId}")]
    public async Task<IActionResult> Buscar(int VagaId)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();

        var vaga = await _dbContext.Vagas
            .Where(f => f.VagaId == VagaId)
            .FirstOrDefaultAsync();

        return Ok(vaga);
    }

    [HttpGet()]
    [Route("listarVagasOcupadas")]
    public async Task<IActionResult> ListarVagasOcupadas()
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();

        var vagasOcupadas = await _dbContext.Vagas
            .Where(v => v.Ocupada == true)
            .ToListAsync();

        return Ok(vagasOcupadas);
    }

    [HttpGet()]
    [Route("listarVagasLivres")]
    public async Task<IActionResult> ListarVagasLivres()
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();

        var vagasLivres = await _dbContext.Vagas
            .Where(v => v.Ocupada == false)
            .ToListAsync();

        return Ok(vagasLivres);
    }

    [HttpPost()]
    [Route("cadastrar")]
    public async Task<IActionResult> Cadastrar([FromBody] Vaga novaVaga)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();

        novaVaga.Ocupada = false;
        novaVaga.Carro_Placa = null;

        _dbContext.Vagas.Add(novaVaga);

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok("Vaga cadastrada com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao cadastrar a vaga.");
        }
    }

    [HttpPatch()]
    [Route("ocuparVaga/{VagaId}")]
    public async Task<IActionResult> OcuparVaga(int VagaId, [FromForm] string placaCarro)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();

        if(_dbContext.Carros is null)
            return NotFound();

        // Verifique se o carro com a placa existe no banco de dados
        var carroExistente = await _dbContext.Carros.FirstOrDefaultAsync(c => c.Placa == placaCarro);

        if (carroExistente == null)
        {
            return NotFound(new { mensagem = "Carro não encontrado."});
        }

        var vaga = await _dbContext.Vagas.FindAsync(VagaId);

        if (vaga == null)
        {
            return NotFound(new { mensagem = "Vaga não encontrada."});
        }

        if (vaga.Ocupada == true && vaga.Carro_Placa == placaCarro)
        {
            // O carro já ocupa a vaga, não é necessário fazer nada
            return Ok(new {mensagem = "A vaga já está ocupada pelo mesmo carro."});
        }

        vaga.Ocupada = true;
        vaga.Carro_Placa = placaCarro;

        _dbContext.Entry(vaga).State = EntityState.Modified;

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok(new {mensagem = $"Vaga ocupada com sucesso pelo carro de placa: {placaCarro}"});
        }
        catch (Exception)
        {
            return StatusCode(500, new{ mensagem = "Erro ao alterar a ocupação da vaga."});
        }
    }


    [HttpPatch()]
    [Route("liberarVaga/{VagaId}")]
    public async Task<IActionResult> LiberarVaga(int VagaId)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();

        var vaga = await _dbContext.Vagas.FindAsync(VagaId);

        if (vaga == null)
        {
            return NotFound("Vaga não encontrada.");
        }

        if (!vaga.Ocupada == true)
        {
            // A vaga já está livre, não é necessário fazer nada
            return Ok("A vaga já está livre.");
        }

        // Remova a placa do carro da vaga e defina Ocupada como false
        vaga.Ocupada = false;
        vaga.Carro_Placa = null;

        _dbContext.Entry(vaga).State = EntityState.Modified;

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok("Vaga liberada com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao liberar a vaga.");
        }
    }



    [HttpPatch()]
    [Route("alterarTipo/{VagaId}")]
    public async Task<IActionResult> AlterarTipo(int VagaId, [FromBody] string novoTipo)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();

        var vaga = await _dbContext.Vagas.FindAsync(VagaId);

        if (vaga == null)
        {
            return NotFound("Vaga não encontrada.");
        }

        vaga.Tipo = novoTipo;
        _dbContext.Entry(vaga).State = EntityState.Modified;

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok("Tipo da vaga alterado com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao alterar o tipo da vaga.");
        }
    }

    [HttpDelete()]
    [Route("deletarVaga/{VagaId}")]
    public async Task<IActionResult> DeletarVaga(int VagaId)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();
        
        var vaga = await _dbContext.Vagas.FindAsync(VagaId);

        if (vaga == null)
        {
            return NotFound("Vaga não encontrada.");
        }

        _dbContext.Vagas.Remove(vaga);

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok("Vaga excluída com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao excluir a vaga.");
        }
    }
}

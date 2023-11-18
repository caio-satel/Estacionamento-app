using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("[controller]")]
[ApiController]
public class FuncionarioController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public FuncionarioController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet()]
    [Route("listarFuncionarios")]
    public async Task<ActionResult<Funcionario>> ListarFuncionarios()
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Funcionarios is null) 
            return NotFound();

        try
        {
            var funcionarios = await _dbContext.Funcionarios.ToListAsync();
            return Ok(funcionarios);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao listar funcionários: {ex.Message}");
        }
    }

    [HttpGet]
    [Route("buscarFuncionario/{matricula}")]
    public async Task<ActionResult<Funcionario>> Buscar(string matricula)
    {
        if(_dbContext is null)
            return NotFound();

        if(_dbContext.Funcionarios is null) 
            return NotFound();

        var funcionarioEspecifico = await _dbContext.Funcionarios
        .Where(f => f.Matricula == matricula)
        .FirstOrDefaultAsync();

        if(funcionarioEspecifico is null)
            return NotFound("Funcionario não encontrado.");

        return Ok(funcionarioEspecifico);
    }

    [HttpPost()]
    [Route("cadastrarFuncionario")]
    public async Task<IActionResult> CadastrarFuncionario([FromBody] Funcionario novoFuncionario)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Funcionarios is null) 
            return NotFound();

        try
        {
            _dbContext.Funcionarios.Add(novoFuncionario);
            await _dbContext.SaveChangesAsync();
            return Ok("Funcionário cadastrado com sucesso.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao cadastrar funcionário: {ex.Message}");
        }
    }

    [HttpPut()]
    [Route("editar/{matricula}")]
    public async Task<IActionResult> editarFuncionario(string matricula, Funcionario novoFuncionario)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Funcionarios is null) 
            return NotFound();

        var funcionario = await _dbContext.Funcionarios.FirstOrDefaultAsync(f => f.Matricula == matricula);

        if (funcionario == null)
        {
            return NotFound("Funcionário não encontrado.");
        }

        funcionario.Cargo = novoFuncionario.Cargo;
        funcionario.Matricula = funcionario.Matricula;
        funcionario.Nome = funcionario.Nome;

        _dbContext.Entry(funcionario).State = EntityState.Modified;

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao alterar cargo do funcionário: {ex.Message}");
        }
    }

    [HttpDelete()]
    [Route("deletarFuncionario/{matricula}")]
    public async Task<IActionResult> DeletarFuncionario(string matricula)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Funcionarios is null) 
            return NotFound();

        try
        {
            var funcionario = await _dbContext.Funcionarios.FirstOrDefaultAsync(f => f.Matricula == matricula);

            if (funcionario == null)
            {
                return NotFound("Funcionário não encontrado.");
            }

            _dbContext.Funcionarios.Remove(funcionario);
            await _dbContext.SaveChangesAsync();
            return Ok("Funcionário removido com sucesso.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao deletar funcionário: {ex.Message}");
        }
    }
}

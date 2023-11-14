using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;

namespace testeFds.Controllers;

[ApiController]
[Route("[controller]")]
public class ClienteController : ControllerBase
{
    private AppDbContext _dbContext;
    public ClienteController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [Route("listar")]
    public async Task<ActionResult<IEnumerable<Cliente>>> Listar()
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        var clientes = await _dbContext.Clientes.Include(c => c.Carros).ToListAsync();

        return Ok(clientes);
    }

    [HttpGet]
    [Route("buscar/{cpf}")]
    public async Task<ActionResult<Cliente>> Buscar(string cpf)
    {
        if(_dbContext is null)
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        var clienteEspecifico = await _dbContext.Clientes.Include(c => c.Carros)
                                             .SingleOrDefaultAsync(c => c.Cpf == cpf);

        if(clienteEspecifico is null)
            return NotFound("Cliente não encontrado.");

        return clienteEspecifico;
    }

    [HttpPost]
    [Route("cadastrar")]
    public async Task<ActionResult<Cliente>> Cadastrar([FromBody] Cliente cliente)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        var novoCliente = new Cliente
        {
            Nome = cliente.Nome,
            Cpf = cliente.Cpf,
            Telefone = cliente.Telefone,
            Carros = new List<Carro>()  // Array de carros vazio
        };

        await _dbContext.AddAsync(novoCliente);
        var registrado = await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(Buscar), new { cpf = cliente.Cpf }, novoCliente);
    }

    [HttpPatch()]
    [Route("mudarTelefone/{cpf}")]
    public async Task<IActionResult> MudarTelefone(string cpf, [FromForm] string telefone)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        var cliente = await _dbContext.Clientes.FindAsync(cpf);

        if (cliente == null)
        {
            return NotFound("Cliente não encontrado.");
        }

        cliente.Telefone = telefone;

        _dbContext.Entry(cliente).State = EntityState.Modified;

        try
        {
            await _dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ClienteExiste(cpf))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return Ok("Telefone alterado com sucesso.");
    }

    [HttpDelete()]
    [Route("deletar/{cpf}")]
    public async Task<ActionResult> Deletar(string cpf)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        if(_dbContext.Carros is null)
            return NotFound();

        var cliente = await _dbContext.Clientes.Include(c => c.Carros)
                                         .FirstOrDefaultAsync(c => c.Cpf == cpf);

        if (cliente == null)
        {
            return NotFound("Cliente não encontrado.");
        }

        if(cliente.Carros is null)
            return NotFound();
            
        // Remova todos os carros relacionados ao cliente
        _dbContext.Carros.RemoveRange(cliente.Carros);

        // Agora, remova o cliente
        _dbContext.Clientes.Remove(cliente);

        await _dbContext.SaveChangesAsync();

        return Ok("Cliente removido com sucesso.");
    }

    private bool ClienteExiste(string cpf)
    {
        return _dbContext.Clientes.Any(c => c.Cpf == cpf);
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class CartaoAcessoController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public CartaoAcessoController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet()]
    [Route("listarCartoes")]
    public async Task<ActionResult<CartaoAcesso>> ListarCartoes()
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.CartaoAcessos is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();
        
        var cartoes = await _dbContext.CartaoAcessos
            .ToListAsync();

        var cartoesComCliente = cartoes.Select(c => new
        {
            c.IdCartao,
            c.DataValidade,
            Cliente = new
            {
                _dbContext.Clientes.FirstOrDefault(cliente => cliente.Cpf == c.Cliente_Cpf)?.Nome,
                Cpf = c.Cliente_Cpf
            }
        });

        return Ok(cartoesComCliente);
    }

    [HttpGet()]
    [Route("listarCartoesVencidos")]
    public async Task<IActionResult> ListarCartoesVencidos()
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.CartaoAcessos is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        var dataAtual = DateTime.Now;
        var cartoesVencidos = await _dbContext.CartaoAcessos
            .Where(c => c.DataValidade < dataAtual)
            .ToListAsync();

        var cartoesVencidosComCliente = cartoesVencidos.Select(c => new
        {
            c.IdCartao,
            c.DataValidade,
            Cliente = new
            {
                _dbContext.Clientes.FirstOrDefault(cliente => cliente.Cpf == c.Cliente_Cpf)?.Nome,
                Cpf = c.Cliente_Cpf
            },
            Mensagem = "O cartão está vencido."
        });

        return Ok(cartoesVencidosComCliente);
    }

    [HttpPost()]
    [Route("criarCartao")]
    public async Task<IActionResult> CriarCartao([FromBody] CartaoAcesso novoCartao)
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.CartaoAcessos is null) 
            return NotFound();

        if(_dbContext.Clientes is null) 
            return NotFound();

        if (novoCartao.Cliente_Cpf == null)
        {
            return BadRequest("O CPF do cliente é obrigatório.");
        }

        var cliente = await _dbContext.Clientes.FirstOrDefaultAsync(c => c.Cpf == novoCartao.Cliente_Cpf);
        if (cliente == null)
        {
            return NotFound("Cliente não encontrado.");
        }

        novoCartao.DataValidade = DateTime.Now.AddDays(30);

        _dbContext.CartaoAcessos.Add(novoCartao);
        await _dbContext.SaveChangesAsync();

        return Ok($"Cartão de acesso criado com sucesso. ID do Cartão: {novoCartao.IdCartao}");
    }

    [HttpPatch()]
    [Route("alterarValidade/{IdCartao}")]
    public async Task<IActionResult> AlterarValidade(int IdCartao)
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.CartaoAcessos is null) 
            return NotFound();

        var cartao = await _dbContext.CartaoAcessos.FindAsync(IdCartao);

        if (cartao == null)
        {
            return NotFound("Cartão de acesso não encontrado.");
        }

        if (cartao.DataValidade >= DateTime.Now)
        {
            return BadRequest("O cartão não está vencido.");
        }

        cartao.DataValidade = DateTime.Now.AddDays(30);

        _dbContext.Entry(cartao).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();

        return Ok("Data de validade do cartão atualizada com sucesso.");
    }

    [HttpDelete()]
    [Route("deletarCartao/{IdCartao}")]
    public async Task<IActionResult> DeletarCartao(int IdCartao)
    {
        if(_dbContext is null) 
        return NotFound();

        if(_dbContext.CartaoAcessos is null) 
            return NotFound();

        var cartao = await _dbContext.CartaoAcessos.FindAsync(IdCartao);

        if (cartao == null)
        {
            return NotFound("Cartão de acesso não encontrado.");
        }

        _dbContext.CartaoAcessos.Remove(cartao);
        await _dbContext.SaveChangesAsync();

        return Ok("Cartão de acesso deletado com sucesso.");
    }
}

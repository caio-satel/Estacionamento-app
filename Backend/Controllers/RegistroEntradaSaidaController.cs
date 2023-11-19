using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("[controller]")]
[ApiController]
public class RegistroEntradaSaidaController : ControllerBase
{
    private AppDbContext _dbContext;

    public RegistroEntradaSaidaController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet()]
    [Route("listar")]
    public async Task<ActionResult<RegistroEntradaSaida>> Listar()
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.RegistroEntradasSaidas is null) 
            return NotFound();

        var registros = await _dbContext.RegistroEntradasSaidas.ToListAsync();
        return Ok(registros);
    }

    [HttpGet("buscarRegistro/{registroId}")]
public async Task<ActionResult<RegistroEntradaSaida>> BuscarRegistro(int registroId)
{
    if (_dbContext is null)
        return NotFound();

    if (_dbContext.RegistroEntradasSaidas is null)
        return NotFound();

    if (_dbContext.Vagas is null)
        return NotFound();

    try
    {
        var registro = await _dbContext.RegistroEntradasSaidas
            .Where(r => r.RegistroId == registroId)
            .Select(r => new
            {
                r.RegistroId,
                r.DataEntrada,
                r.DataSaida,
                Vaga = new
                {
                    VagaId = r.Vaga_Id,
                    _dbContext.Vagas.FirstOrDefault(v => v.VagaId == r.Vaga_Id).Ocupada,
                },
            })
            .FirstOrDefaultAsync();

        if (registro == null)
        {
            return NotFound($"Registro com registroId {registroId} não encontrado.");
        }

        return Ok(registro);
    }
    catch (Exception)
    {
        return StatusCode(500, "Erro ao buscar o registro.");
    }
}


    [HttpGet()]
    [Route("listarRegistrosCompletos")]
    public async Task<IActionResult> ListarRegistrosCompletos()
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.RegistroEntradasSaidas is null) 
            return NotFound();

        var registrosCompletos = await _dbContext.RegistroEntradasSaidas
            .Where(r => r.DataSaida != null)
            .ToListAsync();

        return Ok(registrosCompletos);
    }

    [HttpGet()]
    [Route("listarRegistrosIncompletos")]
    public async Task<IActionResult> ListarRegistrosIncompletos()
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.RegistroEntradasSaidas is null) 
            return NotFound();

        var registrosIncompletos = await _dbContext.RegistroEntradasSaidas
            .Where(r => r.DataSaida == null)
            .ToListAsync();

        return Ok(registrosIncompletos);
    }

    [HttpPost()]
    [Route("registrarEntrada")]
    public async Task<IActionResult> RegistrarEntrada([FromBody] RegistroEntradaSaida novoRegistro)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.RegistroEntradasSaidas is null) 
            return NotFound();

        if(_dbContext.Carros is null) 
            return NotFound();

        if(_dbContext.Vagas is null) 
            return NotFound();

        // Verifique se a placa do carro existe no banco de dados
        var carroExistente = await _dbContext.Carros.FirstOrDefaultAsync(c => c.Placa == novoRegistro.Carro_Placa);

        if (carroExistente == null)
        {
            return NotFound("Carro não encontrado.");
        }

        // Verifique se a vaga existe no banco de dados
        var vagaExistente = await _dbContext.Vagas.FirstOrDefaultAsync(v => v.VagaId == novoRegistro.Vaga_Id);

        if (vagaExistente == null)
        {
            return NotFound("Vaga não encontrada.");
        }

        if (vagaExistente.Ocupada == true)
        {
            return BadRequest("A vaga já está ocupada.");
        }

        // Defina DataEntrada como a data e hora atual
        novoRegistro.DataEntrada = DateTime.Now;
        novoRegistro.DataSaida = null;

        _dbContext.RegistroEntradasSaidas.Add(novoRegistro);

        // Atualize o status da vaga para ocupada
        vagaExistente.Ocupada = true;
        vagaExistente.Carro_Placa = novoRegistro.Carro_Placa;

        _dbContext.Entry(vagaExistente).State = EntityState.Modified;

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok("Registro de entrada criado com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao criar o registro de entrada.");
        }
    }

[HttpPut("registrarSaida/{VagaId}/{RegistroId}")]
public async Task<IActionResult> RegistrarSaida(int VagaId, int RegistroId)
{
    if (_dbContext is null)
        return NotFound();

    if (_dbContext.RegistroEntradasSaidas is null)
        return NotFound();

    if (_dbContext.Vagas is null)
        return NotFound();

    try
    {
        // Encontre o registro correspondente ao RegistroId
        var registroExistente = await _dbContext.RegistroEntradasSaidas.FindAsync(RegistroId);

        if (registroExistente == null)
        {
            return NotFound("Registro não encontrado.");
        }

        if (registroExistente.DataSaida.HasValue)
        {
            return BadRequest("O registro já possui uma data de saída registrada.");
        }

        // Verifique se o RegistroId corresponde ao VagaId
        if (registroExistente.Vaga_Id != VagaId)
        {
            return BadRequest("O RegistroId não corresponde a VagaId.");
        }

        // Encontre a vaga correspondente ao VagaId
        var vagaExistente = await _dbContext.Vagas.FirstOrDefaultAsync(v => v.VagaId == VagaId);

        if (vagaExistente == null)
        {
            return NotFound("Vaga não encontrada.");
        }

        if (vagaExistente.Ocupada == false)
        {
            return BadRequest("A vaga já está desocupada.");
        }

        // Defina DataSaida como a data e hora atual
        registroExistente.DataSaida = DateTime.Now;

        if (vagaExistente != null)
        {
            vagaExistente.Ocupada = false;
            vagaExistente.Carro_Placa = null;
            _dbContext.Entry(vagaExistente).State = EntityState.Modified;
        }

        _dbContext.Entry(registroExistente).State = EntityState.Modified;

        await _dbContext.SaveChangesAsync();

        return Ok("Registro de saída atualizado com sucesso.");
    }
    catch (Exception)
    {
        return StatusCode(500, "Erro ao atualizar o registro de saída.");
    }
}



    [HttpDelete()]
    [Route("deletarRegistro/{RegistroId}")]
    public async Task<IActionResult> DeletarRegistro(int RegistroId)
    {
        if(_dbContext is null) 
            return NotFound();

        if(_dbContext.RegistroEntradasSaidas is null) 
            return NotFound();

        var registroExistente = await _dbContext.RegistroEntradasSaidas.FindAsync(RegistroId);

        if (registroExistente == null)
        {
            return NotFound("Registro não encontrado.");
        }

        if (string.IsNullOrEmpty(registroExistente.Carro_Placa) ||
            !registroExistente.Vaga_Id.HasValue ||
            !registroExistente.DataSaida.HasValue)
        {
            return BadRequest("O registro não pode ser deletado, pois a vaga ainda está sendo ocupada ou faltam informações.");
        }

        _dbContext.RegistroEntradasSaidas.Remove(registroExistente);

        try
        {
            await _dbContext.SaveChangesAsync();
            return Ok("Registro deletado com sucesso.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Erro ao deletar o registro.");
        }
    }


    // [HttpPatch()]
    // [Route("registrarSaida/{VagaId}/{RegistroId}")]
    // public async Task<IActionResult> RegistrarSaidaCarro(int VagaId, int RegistroId)
    // {
    //     if (_dbContext is null)
    //         return NotFound();

    //     if (_dbContext.RegistroEntradasSaidas is null)
    //         return NotFound();

    //     if (_dbContext.Vagas is null)
    //         return NotFound();

    //     // Encontre o registro correspondente ao RegistroId
    //     var registroExistente = await _dbContext.RegistroEntradasSaidas.FindAsync(RegistroId);

    //     if (registroExistente == null)
    //     {
    //         return NotFound("Registro não encontrado.");
    //     }

    //     if (registroExistente.DataSaida.HasValue)
    //     {
    //         return BadRequest("O registro já possui uma data de saída registrada.");
    //     }

    //     // Verifique se o RegistroId corresponde ao VagaId
    //     if (registroExistente.Vaga_Id != VagaId)
    //     {
    //         return BadRequest("O RegistroId não corresponde a VagaId.");
    //     }

    //     // Encontre a vaga correspondente ao VagaId
    //     var vagaExistente = await _dbContext.Vagas.FirstOrDefaultAsync(v => v.VagaId == VagaId);

    //     if (vagaExistente == null)
    //     {
    //         return NotFound("Vaga não encontrada.");
    //     }

    //     if (!vagaExistente.Ocupada == true)
    //     {
    //         return BadRequest("A vaga já está desocupada.");
    //     }

    //     // Defina DataSaida como a data e hora atual
    //     registroExistente.DataSaida = DateTime.Now;

    //     // Calcule a diferença entre DataSaida e DataEntrada para obter o tempo total
    //     var tempoTotal = registroExistente.DataSaida.Value - registroExistente.DataEntrada;

    //     // Suponhamos que o valor da hora de estacionamento seja de R$ 10 por hora
    //     var valorHoraEstacionamento = 10.0m;

    //     // Calcule o valor total com base no tempo total e em possíveis ServicoExtra
    //     var valorTotal = (decimal)tempoTotal.TotalHours * valorHoraEstacionamento;

    //     // Verifique se há ServicoExtra relacionados ao RegistroEntradaSaida
    //     var servicosExtras = await _dbContext.ServicoExtras
    //         .Where(s => s.Registro_Id == RegistroId)
    //         .ToListAsync();

    //     if (servicosExtras != null && servicosExtras.Any())
    //     {
    //         // Some o custo dos ServicoExtra ao valor total
    //         valorTotal += servicosExtras.Sum(s => s.Custo);
    //     }

    //     // Crie um novo Ticket com os valores calculados
    //     var novoTicket = new Ticket
    //     {
    //         Data_hora_entrada = registroExistente.DataEntrada,
    //         Data_hora_saida = registroExistente.DataSaida,
    //         Total = valorTotal,
    //         Cliente_Cpf = vagaExistente.Carro?.Cliente_Cpf,
    //         Carro_Placa = vagaExistente.Carro?.Placa
    //     };

    //     // Crie um novo registro de Conta ou atualize a conta existente
    //     var conta = await _dbContext.Contas.FirstOrDefaultAsync(c => c.Cliente_Cpf == novoTicket.Cliente_Cpf);

    //     if (conta == null)
    //     {
    //         conta = new Conta
    //         {
    //             Total_gasto = valorTotal,
    //             Cliente_Cpf = novoTicket.Cliente_Cpf
    //         };
    //         _dbContext.Contas.Add(conta);
    //     }
    //     else
    //     {
    //         conta.Total_gasto += valorTotal;
    //         _dbContext.Entry(conta).State = EntityState.Modified;
    //     }

    //     _dbContext.Tickets.Add(novoTicket);
    //     vagaExistente.Ocupada = false;
    //     vagaExistente.Carro_Placa = null;
    //     _dbContext.Entry(vagaExistente).State = EntityState.Modified;

    //     _dbContext.Entry(registroExistente).State = EntityState.Modified;

    //     try
    //     {
    //         await _dbContext.SaveChangesAsync();
    //         return Ok("Registro de saída atualizado com sucesso. Ticket gerado e conta atualizada.");
    //     }
    //     catch (Exception)
    //     {
    //         return StatusCode(500, "Erro ao atualizar o registro de saída.");
    //     }
    // }
}

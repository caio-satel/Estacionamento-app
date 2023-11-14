using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    // public DbSet<NomeEntidade>? TabelaDaEntidade { get; set;}
    public DbSet<Carro>? Carros { get; set; }
    public DbSet<Cliente>? Clientes { get; set; }
    public DbSet<Conta>? Contas { get; set; }
    public DbSet<Funcionario>? Funcionarios { get; set; }
    public DbSet<Pagamento>? Pagamentos { get; set; }
    public DbSet<Reserva>? Reservas { get; set; }
    public DbSet<ServicoExtra>? ServicoExtras { get; set; }
    public DbSet<Tarifario>? Tarifarios { get; set; }
    public DbSet<Vaga>? Vagas { get; set; }
    public DbSet<Ticket>? Tickets { get; set; }
    public DbSet<CartaoAcesso>? CartaoAcessos { get; set; }
    public DbSet<RegistroEntradaSaida>? RegistroEntradasSaidas { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("DataSource=app.db;Cache=Shared");
    }

}
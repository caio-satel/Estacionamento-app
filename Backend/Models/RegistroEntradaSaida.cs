using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class RegistroEntradaSaida
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? RegistroId { get; set; }
    public DateTime? DataEntrada { get; set; } = DateTime.Now;
    public DateTime? DataSaida { get; set; }

    [ForeignKey("Carro_Placa")]
    public string? Carro_Placa { get; set; }

    [ForeignKey("Vaga_Id")]
    public int? Vaga_Id { get; set; }
}
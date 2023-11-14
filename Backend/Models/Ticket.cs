using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Ticket
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? Codigo { get; set;}
    public DateTime? Data_hora_entrada { get; set; } = DateTime.Now;
    public DateTime? Data_hora_saida { get; set; }
    public float? Total { get; set; }

    [ForeignKey("Cliente_Cpf")]
    public string? Cliente_Cpf { get; set; }

    [ForeignKey("Carro_Placa")]
    public string? Carro_Placa { get; set; }
}
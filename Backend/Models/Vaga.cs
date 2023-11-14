using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Vaga
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? VagaId { get; set; }
    public bool? Ocupada { get; set; }
    public string? Tipo { get; set; }

    [ForeignKey("Carro_Placa")]
    public string? Carro_Placa { get; set; }
    
}
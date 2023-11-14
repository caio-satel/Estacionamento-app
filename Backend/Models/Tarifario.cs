using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Tarifario
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? IdTarifario { get; set; }

    [Required(ErrorMessage = "Campo Tarifa por Hora é obrigatório.")]
    public float? Tarifa_hora { get; set; }

    [Required(ErrorMessage = "Campo Tarifa Diaria é obrigatório.")]
    public float? Tarifa_diaria { get; set; }

    [Required(ErrorMessage = "Campo Tarifa Mensal é obrigatório.")]
    public float? Tarifa_mensal { get; set; }
}
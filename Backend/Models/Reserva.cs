using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Reserva
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? ReservaId { get; set; }

    [Required(ErrorMessage = "Campo Data/Hora Reserva é obrigatório")]
    public DateTime? Data_hora_reserva { get; set; }

    [ForeignKey("Cliente_Cpf")]
    public string? Cliente_Cpf { get; set; }

    [ForeignKey("Vaga_Id")]
    public int? Vaga_Id { get; set; }
}
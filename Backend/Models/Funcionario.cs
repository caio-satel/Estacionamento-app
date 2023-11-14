using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Funcionario
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdFuncionario { get; set; }

    [Required(ErrorMessage = "Campo Nome é obrigatório")]
    public string? Nome { get; set; }

    [Required(ErrorMessage = "Campo Matriculo é obrigatório")]
    public string? Matricula { get; set; }

    [Required(ErrorMessage = "Campo Cargo é obrigatório")]
    public string? Cargo { get; set; }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class CartaoAcesso
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdCartao { get; set; }
    
    [Required(ErrorMessage = "Campo Data de Validade é obrigatório.")]
    public DateTime? DataValidade { get; set; }

    [ForeignKey("Cliente_Cpf")]
    public string? Cliente_Cpf { get; set; }

}

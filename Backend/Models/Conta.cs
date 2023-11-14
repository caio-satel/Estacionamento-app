using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Conta
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IdConta { get; set; }

    [Required(ErrorMessage = "Campo Total Gasto é obrigatório.")]
    public float? Total_gasto { get; set; }
    
    //Chave estrangeira referenciando a tabela Cliente
    [ForeignKey("Cliente_Cpf")]
    public string? Cliente_Cpf { get; set; }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ServicoExtra
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? ServicoId { get; set; }

    [Required(ErrorMessage = "Campo Descrição é obrigatório")]
    public string? Descricao { get; set; }

    [Required(ErrorMessage = "Campo Custo é obrigatório")]
    public float Custo { get; set; }

    [ForeignKey("Cliente_Cpf")]
    public string? Cliente_Cpf { get; set; }

    [ForeignKey("Carro_Placa")]
    public string? Carro_Placa { get; set; }

    [ForeignKey("Funcionario_Id")]
    public int? Funcionario_Id { get; set; }
}

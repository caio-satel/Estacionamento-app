using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Carro
{
    [Key]
    [Required(ErrorMessage = "Campo Placa é obrigatório!")]
    public string? Placa { get; set; }

    [Required(ErrorMessage = "Campo Modelo é obrigatório!")]
    public string? Modelo { get; set; }

    [Required(ErrorMessage = "Campo Cor é obrigatório!")]
    public string? Cor { get; set; }

    [ForeignKey("Cliente_Cpf")]
    public string? Cliente_Cpf { get; set; } // Esse é o campo que se relaciona com a tabela Clientes
}
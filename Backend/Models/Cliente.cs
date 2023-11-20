using System.ComponentModel.DataAnnotations;

public class Cliente
{
    [Key]
    [Required(ErrorMessage = "Cpf obrigatório!")]
    public string? Cpf { get; set; }

    [Required(ErrorMessage = "Nome obrigatório!")]
    public string? Nome { get; set; }

    [Required(ErrorMessage = "Telefone obrigatório!")]
    public string? Telefone { get; set; }
    public ICollection<Carro>? Carros { get; set; }

}
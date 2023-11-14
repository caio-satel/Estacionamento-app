using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Pagamento
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Codigo { get; set; }
    public DateTime? Data_hora_pagamento { get; set; } = DateTime.Now;

    [Required(ErrorMessage = "Campo Valor Pago é obrigatório")]
    public float? Valor_pago { get; set; }

    [ForeignKey("Conta_Id")]
    public int? Conta_Id { get; set; }
    
    //Chave estrangeira referenciando a tabela Ticket
    [ForeignKey("Codigo_Ticket")]
    public int? Codigo_Ticket { get; set; }
    
}
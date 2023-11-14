export class Ticket {
    codigo: number = 0;
    data_hora_entrada: Date = new Date();
    data_hora_saida: Date = new Date();
    total: number = 0;
    cliente_cpf: string = '';
    carro_placa: string = '';
}
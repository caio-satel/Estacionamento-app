export class Reserva {
    [x: string]: any;
    reservaId: number = 0;
    data_hora_reserva: Date = new Date();
    cliente_cpf: string = '';
    vaga_id: number = 0;
}
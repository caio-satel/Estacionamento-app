import { Carro } from './Carro';

export class Cliente {
    cpf: string = '';
    nome: string = '';
    telefone: string = '';
    Carros: Array<Carro> = [];
}
import { Component, OnInit } from '@angular/core';
import { Carro } from 'src/app/Models/Carro';
import { Cliente } from 'src/app/Models/Cliente';
import { ClientesService } from 'src/app/services/Cliente/clientes.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientesExcluirComponent } from '../excluir/clientes-excluir/clientes-excluir.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit{
  clientes: Cliente[] = [];
  clienteGeral: Cliente[] = [];
  carros: Carro[] = [];
  carroGeral: Carro[] = [];
  colunas = ['CPF', 'Nome', 'Telefone', 'Carros', 'Ações', 'Excluir'];
  
  constructor(private clientesService : ClientesService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.clientesService.listarClientes().subscribe((data) => {
      this.clientes = data;
      this.clienteGeral = data;
    })
  }

  search(event : Event){
    //Recebe um evento de INPUT
    const target = event.target as HTMLInputElement;
    //Transforma o value em string (todos caracteres minusculos)
    const value = target.value.toLowerCase();

    //Filtra os clientes com base no valor inserido no input, atualizando a lista de clientes
    this.clientes = this.clienteGeral?.filter(Cliente => {
      return Cliente.nome.toLowerCase().includes(value);
    })
  }

  OpenDialog(cpf: string, enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(ClientesExcluirComponent, {
      data: {
        cpf: cpf
      },
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}

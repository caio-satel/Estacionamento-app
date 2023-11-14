import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Models/Cliente';
import { ClientesService } from 'src/app/services/Cliente/clientes.service';

@Component({
  selector: 'app-clientes-excluir',
  templateUrl: './clientes-excluir.component.html',
  styleUrls: ['./clientes-excluir.component.css']
})
export class ClientesExcluirComponent {
  inputdata: any;
  cliente!: Cliente
  clientes: Cliente[] = [];

  constructor(private clientesServices: ClientesService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ClientesExcluirComponent>) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.clientesServices.buscarCliente(this.inputdata.cpf).subscribe((cliente) =>{
      this.cliente = cliente;
    })
  }

  Excluir(): void {
    this.clientesServices.deletarCliente(this.inputdata.cpf).subscribe((data) => {
        this.ref.close();
    })
    window.location.reload();
  }
}

import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Models/Cliente';
import { ClientesService } from 'src/app/services/Cliente/clientes.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent {
  formulario : any;
  @Input() btnAcao: string = 'Salvar';
  @Input() txtTitulo: string = 'Cadastrar Cliente';
  @Input() dadosCliente: Cliente | null = null;

  constructor(private clientesServices : ClientesService, private router : Router) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      cpf: new FormControl(this.dadosCliente ? this.dadosCliente.cpf : null, [Validators.required]),
      nome: new FormControl(this.dadosCliente ? this.dadosCliente.nome : null, [Validators.required]),
      telefone: new FormControl(this.dadosCliente ? this.dadosCliente.telefone : null, [Validators.required]),
    })
  }
  
  enviarFormulario(): void {
    const cliente : Cliente = this.formulario.value;
    this.clientesServices.cadastrarCliente(cliente).subscribe(() => {
      
    })
    this.router.navigate(['/clientes']);
  } 
}

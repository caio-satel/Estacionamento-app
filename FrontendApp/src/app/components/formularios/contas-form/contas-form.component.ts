import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Models/Cliente';
import { Conta } from 'src/app/Models/Conta';
import { ClientesService } from 'src/app/services/Cliente/clientes.service';
import { ContasService } from 'src/app/services/Conta/contas.service';

@Component({
  selector: 'app-contas-form',
  templateUrl: './contas-form.component.html',
  styleUrls: ['./contas-form.component.css']
})
export class ContasFormComponent {
  formulario: any;
  clientes: Cliente[] = [];
  @Input() modoEdicao: boolean = false;
  @Input() btnAcao: string = 'Salvar';
  @Input() txtTitulo: string = 'Cadastrar Conta';
  @Input() dadosConta: Conta | null = null;

  constructor(
    private contasService: ContasService,
    private clientesService: ClientesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientesService.listarClientes().subscribe((data) => {
      this.clientes = data;
    });

    this.modoEdicao = !!this.dadosConta;

    this.formulario = new FormGroup({
      total_gasto: new FormControl(this.dadosConta ? this.dadosConta.total_gasto : null, [
        Validators.required,
      ]),
      cliente_cpf: new FormControl(this.dadosConta ? this.dadosConta.cliente_cpf : null, [
        Validators.required,
      ]),
    });
  }

  enviarFormulario(): void {
    const conta: Conta = this.formulario.value;
    console.log(conta)
  
    if (this.modoEdicao && this.dadosConta) {
      const idConta: number = this.dadosConta.idConta;
      this.contasService.atualizarConta(idConta, conta).subscribe(() => {
      
      });
    } else {
      this.contasService.criarConta(conta).subscribe(() => {
        
      });
    }
    this.router.navigate(['/contas']);
  }
}

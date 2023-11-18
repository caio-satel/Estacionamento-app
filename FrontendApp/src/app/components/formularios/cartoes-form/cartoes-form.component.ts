import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartaoAcesso } from 'src/app/Models/CartaoAcesso';
import { Cliente } from 'src/app/Models/Cliente';
import { CartaoAcessosService } from 'src/app/services/CartaoAcesso/cartao-acessos.service';
import { ClientesService } from 'src/app/services/Cliente/clientes.service';

@Component({
  selector: 'app-cartoes-form',
  templateUrl: './cartoes-form.component.html',
  styleUrls: ['./cartoes-form.component.css'],
})
export class CartoesFormComponent {
  formulario: any;
  cartoes: CartaoAcesso[] = [];
  clientes: Cliente[] = [];
  @Input() modoEdicao: boolean = false;
  @Input() btnAcao: string = 'Salvar';
  @Input() txtTitulo: string = 'Cadastrar Cartão';
  @Input() dadosCartao: CartaoAcesso | null = null;

  constructor(
    private clientesServices: ClientesService,
    private cartaoServices: CartaoAcessosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientesServices.listarClientes().subscribe((data) => {
      this.clientes = data;
    });

    this.modoEdicao = !!this.dadosCartao;

    this.formulario = new FormGroup({
      cliente_Cpf: new FormControl(
        this.dadosCartao ? this.dadosCartao.cliente_cpf : null,
        [Validators.required]
      ),
      dataValidade: new FormControl(new Date()),
    });
  }

  enviarFormulario(): void {
    const cartao = this.formulario.value;

    if (this.modoEdicao && this.dadosCartao) {
      const idCartao: number = this.dadosCartao.idCartao;
      this.cartaoServices.validarCartao(idCartao).subscribe(() => {});
    } else {
      this.cartaoServices.cadastrarCartaoAcesso(cartao).subscribe(() => {});
    }
    this.router.navigate(['/cartao-acesso']);
  }
}

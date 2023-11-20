import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Carro } from 'src/app/Models/Carro';
import { Cliente } from 'src/app/Models/Cliente';
import { CarrosService } from 'src/app/services/Carro/carros.service';
import { ClientesService } from 'src/app/services/Cliente/clientes.service';

@Component({
  selector: 'app-carros-form',
  templateUrl: './carros-form.component.html',
  styleUrls: ['./carros-form.component.css'],
})

export class CarrosFormComponent implements OnInit {
  formulario: any;
  clientes: Cliente[] = [];
  //Propriedades de entrada
  @Input() modoEdicao: boolean = false;
  @Input() btnAcao: string = 'Salvar';
  @Input() txtTitulo: string = 'Cadastrar Veículo';
  @Input() dadosCarro: Carro | null = null;

  //Injeção de dependencia
  constructor(
    private carrosService: CarrosService,
    private clientesService: ClientesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientesService.listarClientes().subscribe((data) => {
      this.clientes = data;
    });

    //Operador de negação dupla // Como se fosse um if else
    //A propriedade modoEdicao será true se dadosCarro contiver um valor,
    //false se dadosCarro não contiver um valor
    this.modoEdicao = !!this.dadosCarro;

    //Inicia o formulario de acordo com dadosCarro, caso existir iniciar o formulario com seus dados
    //caso n existir inicia o formulario com campos vazios
    this.formulario = new FormGroup({
      placa: new FormControl(this.dadosCarro ? this.dadosCarro.placa : null, [
        Validators.required,
      ]),
      modelo: new FormControl(this.dadosCarro ? this.dadosCarro.modelo : null, [
        Validators.required,
      ]),
      cor: new FormControl(this.dadosCarro ? this.dadosCarro.cor : null, [
        Validators.required,
      ]),
      cliente_cpf: new FormControl(
        this.dadosCarro ? this.dadosCarro.cliente_cpf : null,
        [Validators.required]
      ),
    });
  }

  //Executa o método ao clica no botão de enviar o form
  enviarFormulario(): void {
    const carro: Carro = this.formulario.value;
    const cpf: string = this.formulario.get('cliente_cpf').value;
  
    if (this.modoEdicao && this.dadosCarro) {
      const placa: string = this.dadosCarro.placa;
      this.carrosService.editarCarro(placa, carro).subscribe(() => {
      
      });
    } else {
      this.carrosService.cadastrarCarro(cpf, carro).subscribe(() => {
        
      });
    }
    this.router.navigate(['/carros']);
  }
}

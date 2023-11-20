import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Carro } from 'src/app/Models/Carro';
import { Cliente } from 'src/app/Models/Cliente';
import { Funcionario } from 'src/app/Models/Funcionario';
import { ServicoExtra } from 'src/app/Models/ServicoExtra';
import { CarrosService } from 'src/app/services/Carro/carros.service';
import { ClientesService } from 'src/app/services/Cliente/clientes.service';
import { FuncionarioService } from 'src/app/services/Funcionario/funcionario.service';
import { ServicoExtrasService } from 'src/app/services/ServicoExtra/servico-extras.service';

@Component({
  selector: 'app-servicos-form',
  templateUrl: './servicos-form.component.html',
  styleUrls: ['./servicos-form.component.css']
})
export class ServicosFormComponent {
  formulario: any;
  servicos: ServicoExtra[] = [];
  clientes: Cliente[] = [];
  carros: Carro[] = [];
  funcionarios: Funcionario[] = [];
  @Input() modoEdicao: boolean = false;
  @Input() btnAcao: string = 'Salvar';
  @Input() txtTitulo: string = 'Registrar Serviço';
  @Input() dadosServico: ServicoExtra | null = null;

  constructor(
    private servicosServices: ServicoExtrasService,
    private carrosServices: CarrosService,
    private clientesServices: ClientesService,
    private funcionariosServices: FuncionarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientesServices.listarClientes().subscribe((data) => {
      this.clientes = data;
    });

    this.carrosServices.listarCarros().subscribe((data) => {
      this.carros = data;
    });

    this.funcionariosServices.listarFuncionarios().subscribe((data) => {
      this.funcionarios = data;
    });

    this.modoEdicao = !!this.dadosServico;

    this.formulario = new FormGroup({
      descricao: new FormControl(
        this.dadosServico ? this.dadosServico.descricao : null, [Validators.required]
      ),
      custo: new FormControl(
        this.dadosServico ? this.dadosServico.custo : null, [Validators.required]
      ),
      cliente_Cpf: new FormControl(
        this.dadosServico ? this.dadosServico.cliente_cpf : null,
        [Validators.required]
      ),
      carro_Placa: new FormControl(
        this.dadosServico ? this.dadosServico.carro_placa : null,
        [Validators.required]
      ),
      funcionario_Id: new FormControl(
        this.dadosServico ? this.dadosServico.funcionario_id : null,
        [Validators.required]
      ),
    });
  }

  enviarFormulario(): void {
    const servico = this.formulario.value;
    console.log(servico)

    if (this.modoEdicao && this.dadosServico) {
      const servicoId: number = this.dadosServico.servicoId;
      this.servicosServices
        .atualizarServico(servicoId, servico)
        .subscribe(() => {});
    } else {
      this.servicosServices.cadastrarServicoExtra(servico).subscribe(() => {});
    }
    this.router.navigate(['/servico-extra']);
  }
}

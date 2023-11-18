import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicoExtra } from 'src/app/Models/ServicoExtra';
import { ServicoExtrasService } from 'src/app/services/ServicoExtra/servico-extras.service';

@Component({
  selector: 'app-servicos-editar',
  templateUrl: './servicos-editar.component.html',
  styleUrls: ['./servicos-editar.component.css']
})
export class ServicosEditarComponent {
  @Input() btnAcao: string = 'Editar';
  @Input() txtTitulo: string = 'Editar Serviço';
  servico!: ServicoExtra;
  formulario!: FormGroup;

  constructor(private servicosServices: ServicoExtrasService, private route: ActivatedRoute, public router : Router){}

  ngOnInit(): void {
    const servicoId = Number(this.route.snapshot.paramMap.get('servicoId'));

    console.log(servicoId)

    this.servicosServices.buscarServicoExtra(servicoId).subscribe((data) => {
      this.servico = data;

      console.log(data);

      this.formulario = new FormGroup({
        descricao: new FormControl(this.servico?.descricao, [Validators.required]),
        custo: new FormControl(this.servico?.custo, [Validators.required]),
        cliente_Cpf: new FormControl(this.servico?.cliente_cpf, [Validators.required]),
        carro_Placa: new FormControl(this.servico?.carro_placa, [Validators.required]),
        funcionario: new FormControl(this.servico?.funcionario_id, [Validators.required]),
      })
    })
  }
}

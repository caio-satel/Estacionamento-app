import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Conta } from 'src/app/Models/Conta';
import { ContasService } from 'src/app/services/Conta/contas.service';

@Component({
  selector: 'app-contas-editar',
  templateUrl: './contas-editar.component.html',
  styleUrls: ['./contas-editar.component.css']
})
export class ContasEditarComponent {
  @Input() btnAcao: string = 'Editar';
  @Input() txtTitulo: string = 'Editar Conta';
  conta!: Conta;
  formulario!: FormGroup;

  constructor(private contasService: ContasService, private route: ActivatedRoute, public router : Router){}

  ngOnInit(): void {
    const contaId = Number(this.route.snapshot.paramMap.get('contaId'));
    console.log(contaId)

    this.contasService.buscarConta(contaId).subscribe((data) => {
      this.conta = data;

      console.log(data);

      this.formulario = new FormGroup({
        total_gasto: new FormControl(this.conta?.total_gasto, [Validators.required]),
        cliente_cpf: new FormControl(this.conta?.cliente_cpf, [Validators.required]),
      })
    })
  }
}

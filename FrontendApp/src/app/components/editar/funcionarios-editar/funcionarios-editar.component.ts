import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/Models/Funcionario';
import { FuncionarioService } from 'src/app/services/Funcionario/funcionario.service';

@Component({
  selector: 'app-funcionarios-editar',
  templateUrl: './funcionarios-editar.component.html',
  styleUrls: ['./funcionarios-editar.component.css']
})
export class FuncionariosEditarComponent {
  @Input() btnAcao: string = 'Editar';
  @Input() txtTitulo: string = 'Editar Funcionário';
  funcionario!: Funcionario;
  formulario!: FormGroup;

  constructor(private funcionariosService: FuncionarioService, private route: ActivatedRoute, public router : Router){}

  ngOnInit(): void {
    const matricula = String(this.route.snapshot.paramMap.get('matricula'));

    this.funcionariosService.buscarFuncionario(matricula).subscribe((data) => {
      this.funcionario = data;

      console.log(data);

      this.formulario = new FormGroup({
        nome: new FormControl(this.funcionario?.nome, [Validators.required]),
        matricula: new FormControl(this.funcionario?.matricula, [Validators.required]),
        cargo: new FormControl(this.funcionario?.cargo, [Validators.required]),
      })
    })
  }
}

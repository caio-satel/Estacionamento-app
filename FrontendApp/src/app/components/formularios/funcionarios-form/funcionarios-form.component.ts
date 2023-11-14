import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/Models/Funcionario';
import { FuncionarioService } from 'src/app/services/Funcionario/funcionario.service';

@Component({
  selector: 'app-funcionarios-form',
  templateUrl: './funcionarios-form.component.html',
  styleUrls: ['./funcionarios-form.component.css']
})
export class FuncionariosFormComponent {
  formulario : any;
  @Input() btnAcao: string = 'Salvar';
  @Input() txtTitulo: string = 'Cadastrar Funcionário';
  @Input() dadosFuncionario: Funcionario | null = null;

  constructor(private funcionariosServices : FuncionarioService, private router : Router) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nome: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.nome : null, [Validators.required]),
      matricula: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.matricula : null, [Validators.required]),
      cargo: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.cargo : null, [Validators.required]),
    })
  }
  
  enviarFormulario(): void {
    const funcionario : Funcionario = this.formulario.value;
    this.funcionariosServices.cadastrarFuncionario(funcionario).subscribe(() => {
      window.location.reload();
    })
    this.router.navigate(['/funcionarios']);
  } 
}

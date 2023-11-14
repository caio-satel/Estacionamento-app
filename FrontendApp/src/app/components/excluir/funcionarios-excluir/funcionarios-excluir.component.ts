import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Funcionario } from 'src/app/Models/Funcionario';
import { FuncionarioService } from 'src/app/services/Funcionario/funcionario.service';

@Component({
  selector: 'app-funcionarios-excluir',
  templateUrl: './funcionarios-excluir.component.html',
  styleUrls: ['./funcionarios-excluir.component.css']
})
export class FuncionariosExcluirComponent {
  inputdata: any;
  funcionario!: Funcionario
  funcionarios: Funcionario[] = [];

  constructor(private funcionariosService: FuncionarioService, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FuncionariosExcluirComponent>) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.funcionariosService.buscarFuncionario(this.inputdata.matricula).subscribe((funcionario) =>{
      this.funcionario = funcionario;
    })
  }

  Excluir(): void {
    this.funcionariosService.deletarFuncionario(this.inputdata.matricula).subscribe((data) => {
        this.ref.close();
    })
    window.location.reload();
  }
}

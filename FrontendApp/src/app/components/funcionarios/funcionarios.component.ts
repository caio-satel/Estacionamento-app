import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Funcionario } from 'src/app/Models/Funcionario';
import { FuncionarioService } from 'src/app/services/Funcionario/funcionario.service';
import { FuncionariosExcluirComponent } from '../excluir/funcionarios-excluir/funcionarios-excluir.component';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent {
  funcionarios: Funcionario[] = [];
  funcionarioGeral: Funcionario[] = [];
  colunas = ['Nome', 'Matrícula', 'Cargo', 'Ações', 'Excluir'];
  
  constructor(private funcionariosService : FuncionarioService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.funcionariosService.listarFuncionarios().subscribe((data) => {
      this.funcionarios = data;
      this.funcionarioGeral = data;
    })
  }

  search(event : Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.funcionarios = this.funcionarioGeral?.filter(Funcionario => {
      return Funcionario.nome.toLowerCase().includes(value);
    })
  }

  OpenDialog(matricula: string, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(FuncionariosExcluirComponent, {
      data: {
        matricula: matricula
      },
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}

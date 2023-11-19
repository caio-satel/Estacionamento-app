import { Component } from '@angular/core';
import { ContasExcluirComponent } from '../excluir/contas-excluir/contas-excluir.component';
import { MatDialog } from '@angular/material/dialog';
import { Conta } from 'src/app/Models/Conta';
import { ContasService } from 'src/app/services/Conta/contas.service';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent {
  contas: Conta[] = [];
  contaGeral: Conta[] = [];
  colunas = ['Total', 'Cliente', 'Ações', 'Excluir'];
  
  constructor(private contasService : ContasService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.contasService.listarContas().subscribe((data) => {
      this.contas = data;
      this.contaGeral = data;
    })
  }

  search(event : Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.contas = this.contaGeral?.filter(Conta => {
      return Conta.cliente_cpf.toLowerCase().includes(value);
    })
  }

  OpenDialog(idConta: number, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(ContasExcluirComponent, {
      data: {
        idConta: idConta
      },
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}

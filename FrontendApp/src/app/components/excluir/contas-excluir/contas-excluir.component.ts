import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Conta } from 'src/app/Models/Conta';
import { ContasService } from 'src/app/services/Conta/contas.service';
import { ExcluirComponent } from '../excluir.component';

@Component({
  selector: 'app-contas-excluir',
  templateUrl: './contas-excluir.component.html',
  styleUrls: ['./contas-excluir.component.css']
})
export class ContasExcluirComponent {
  inputdata: any;
  conta!: Conta
  contas: Conta[] = [];

  constructor(private contasService: ContasService, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ExcluirComponent>) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.contasService.buscarConta(this.inputdata.idConta).subscribe((conta) =>{
      this.conta = conta;
    })
  }

  Excluir(): void {
    this.contasService.deletarConta(this.inputdata.idConta).subscribe((data) => {
        this.ref.close();
    })
    window.location.reload();
  }
}

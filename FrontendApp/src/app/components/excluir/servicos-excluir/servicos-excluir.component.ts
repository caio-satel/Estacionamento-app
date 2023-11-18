import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServicoExtra } from 'src/app/Models/ServicoExtra';
import { ServicoExtrasService } from 'src/app/services/ServicoExtra/servico-extras.service';

@Component({
  selector: 'app-servicos-excluir',
  templateUrl: './servicos-excluir.component.html',
  styleUrls: ['./servicos-excluir.component.css']
})
export class ServicosExcluirComponent {
  inputdata: any;
  servico!: ServicoExtra;
  servicos: ServicoExtra[] = [];

  constructor(private servicosServices: ServicoExtrasService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ServicosExcluirComponent>) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.servicosServices.buscarServicoExtra(this.inputdata.servicoId).subscribe((servico) =>{
      this.servico = servico;
      console.log(servico)
    })
  }

  Excluir(): void {
    this.servicosServices.deletarServicoExtra(this.inputdata.servicoId).subscribe((data) => {
        this.ref.close();
    })
    window.location.reload();
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Vaga } from 'src/app/Models/Vaga';
import { VagasService } from 'src/app/services/Vaga/vagas.service';

@Component({
  selector: 'app-vagas-excluir',
  templateUrl: './vagas-excluir.component.html',
  styleUrls: ['./vagas-excluir.component.css']
})
export class VagasExcluirComponent {
  inputdata: any;
  vaga!: Vaga
  vagas: Vaga[] = [];

  constructor(private vagasService: VagasService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<VagasExcluirComponent>) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.vagasService.buscarVaga(this.inputdata.vagaId).subscribe((vaga) =>{
      this.vaga = vaga;
    })
  }

  Excluir(): void {
    this.vagasService.deletarVaga(this.inputdata.vagaId).subscribe((data) => {
        this.ref.close();
    })
    window.location.reload();
  }
}

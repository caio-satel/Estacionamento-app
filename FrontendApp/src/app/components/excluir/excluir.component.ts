import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Carro } from 'src/app/Models/Carro';
import { CarrosService } from 'src/app/services/Carro/carros.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css'],
})
export class ExcluirComponent implements OnInit {
  inputdata: any;
  carro!: Carro
  carros: Carro[] = [];

  constructor(private carrosService: CarrosService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ExcluirComponent>) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.carrosService.buscarCarro(this.inputdata.placa).subscribe((carro) =>{
      this.carro = carro;
    })
  }

  Excluir(): void {
    this.carrosService.deletarCarro(this.inputdata.placa).subscribe((data) => {
        this.ref.close();
    })
    window.location.reload();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Carro } from 'src/app/Models/Carro';
import { CarrosService } from 'src/app/services/Carro/carros.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css'],
})
export class ExcluirComponent implements OnInit {
  inputdata: any;
  //Propriedade carro vai ser inicializada posteriosmente
  carro!: Carro

  //Injeção de dependencia:
  //private ref: MatDialogRef<ExcluirComponent> - para poder manipular o dialog atual, no caso sera usado para fechar esse proprio dialog (this.ref.close())
  //@Inject(MAT_DIALOG_DATA) public data: any - para obter os dados que foram injetados ao executar o método OpenDialog, no caso foi passado a placa como dado
  constructor(private carrosService: CarrosService, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ExcluirComponent>) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.carrosService.buscarCarro(this.inputdata.placa).subscribe((carro) =>{
      this.carro = carro;
    })
  }

  Excluir(): void {
    this.carrosService.deletarCarro(this.inputdata.placa).subscribe((data) => {
      //Usado para fechar o dialog atual, no caso dialog de excluir o carro especifico
        this.ref.close();
    })
    // F5 na pagina para atualizar a lista de carros
    window.location.reload();
  }
}

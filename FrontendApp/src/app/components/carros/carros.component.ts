import { Component, OnInit, ViewChild } from '@angular/core';
import { CarrosService } from 'src/app/services/Carro/carros.service';
import { Carro } from 'src/app/Models/Carro';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from '../excluir/excluir.component';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})

export class CarrosComponent implements OnInit {
  carros: Carro[] = [];
  carroGeral: Carro[] = [];
  colunas = ['Placa', 'Modelo', 'Cor', 'Proprietario', 'Ações', 'Excluir'];
  
  constructor(private carrosService : CarrosService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.carrosService.listarCarros().subscribe((data) => {
      this.carros = data;
      this.carroGeral = data;
    })
  }

  search(event : Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.carros = this.carroGeral?.filter(Carro => {
      return Carro.modelo.toLowerCase().includes(value);
    })
  }

  OpenDialog(placa: string, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(ExcluirComponent, {
      data: {
        placa: placa
      },
      enterAnimationDuration,
      exitAnimationDuration
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { CarrosService } from 'src/app/services/Carro/carros.service';
import { Carro } from 'src/app/Models/Carro';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from '../excluir/excluir.component';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})

// Implementa a interface OnInit que obrigatoriamente necessita do método 'ngOnInit'
export class CarrosComponent implements OnInit {
  carros: Carro[] = [];
  //Variavel para manter uma 'cópia' do array de carros (dados originais), antes que qualquer filtro seja aplicado
  carroGeral: Carro[] = [];
  colunas = ['Placa', 'Modelo', 'Cor', 'Proprietario', 'Ações', 'Excluir'];
  
  // Injeção de dependencia 
  constructor(private carrosService : CarrosService, public dialog : MatDialog) { }

  // Método executado ao iniciar esse componente
  ngOnInit(): void {
    //Usa os endpoints de CarrosServices, 
    //para listar todos os carros e armazenar as variaveis carros e carroGeral que são arrays de Carro
    this.carrosService.listarCarros().subscribe((data) => {
      this.carros = data;
      this.carroGeral = data;
    })
  }

  search(event : Event){
    //Recebe o evento de INPUT - Toda vez que algo é digitado no input, ele é capturado
    const target = event.target as HTMLInputElement;
    //Transforma o value do input em string (todos os caracteres ficam minúsculos)
    const value = target.value.toLowerCase();

    //Filtra os clientes com base no valor inserido no input, atualizando a lista de clientes
    this.carros = this.carroGeral?.filter(Carro => {
      return Carro.modelo.toLowerCase().includes(value);
    })
  }

  //Executa esse método de abrir um dialog do Angular Material,
  //recebe os parametros e passa-os para o 'ExcluirComponent' para executar a busca de qual carro existe com essa placa
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

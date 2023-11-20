import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carro } from 'src/app/Models/Carro';
import { CarrosService } from 'src/app/services/Carro/carros.service';

@Component({
  selector: 'app-carros-editar',
  templateUrl: './carros-editar.component.html',
  styleUrls: ['./carros-editar.component.css']
})
export class CarrosEditarComponent implements OnInit{
  @Input() btnAcao: string = 'Editar';
  @Input() txtTitulo: string = 'Editar Veículo';
  //Indica que a propriedade carro irá ser inicializada posteriormente com o Carro que irá ser buscado no DB
  carro!: Carro;

  //Injeção de dependencia: private route: ActivatedRoute - serve para poder ter acesso aos parametros passados pela URL nesse caso a placa do carro
  constructor(private carrosService: CarrosService, private route: ActivatedRoute, public router : Router){}

  ngOnInit(): void {
    //Obtém o parametro placa da URL e armazena como string na constante
    const placa = String(this.route.snapshot.paramMap.get('placa'));

    this.carrosService.buscarCarro(placa).subscribe((data) => {
      this.carro = data;
    })
  }
}

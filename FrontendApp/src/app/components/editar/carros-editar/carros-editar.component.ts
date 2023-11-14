import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  carro!: Carro;
  formulario!: FormGroup;

  constructor(private carrosService: CarrosService, private route: ActivatedRoute, public router : Router){}

  ngOnInit(): void {
    const placa = String(this.route.snapshot.paramMap.get('placa'));

    this.carrosService.buscarCarro(placa).subscribe((data) => {
      this.carro = data;

      console.log(data);

      this.formulario = new FormGroup({
        placa: new FormControl(this.carro?.placa, [Validators.required]),
        modelo: new FormControl(this.carro?.modelo, [Validators.required]),
        cor: new FormControl(this.carro?.cor, [Validators.required]),
        nomeCliente: new FormControl(this.carro?.nomeCliente, [Validators.required]),
      })
    })
  }

}

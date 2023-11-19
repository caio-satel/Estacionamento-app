import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroEntradaSaida } from 'src/app/Models/RegistroEntradaSaida';
import { RegistroEntradaSaidasService } from 'src/app/services/RegistroEntradaSaida/registro-entrada-saidas.service';

@Component({
  selector: 'app-registro-entrada-saida-editar',
  templateUrl: './registro-entrada-saida-editar.component.html',
  styleUrls: ['./registro-entrada-saida-editar.component.css']
})
export class RegistroEntradaSaidaEditarComponent {
  @Input() btnAcao: string = 'Editar';
  @Input() txtTitulo: string = 'Editar Registro';
  registro!: RegistroEntradaSaida;
  formulario!: FormGroup;

  constructor(private registrosService: RegistroEntradaSaidasService, private route: ActivatedRoute, public router : Router){}

  ngOnInit(): void {
    const registroId = Number(this.route.snapshot.paramMap.get('registroId'));
    console.log(registroId)

    this.registrosService.buscarRegistroEntradaSaida(registroId).subscribe((data) => {
      this.registro = data;

      console.log(data);

      this.formulario = new FormGroup({
        carro_Placa: new FormControl(this.registro?.carro_placa, [Validators.required]),
        vaga_Id: new FormControl(this.registro?.vaga_id, [Validators.required]),
      })
    })
  }
}

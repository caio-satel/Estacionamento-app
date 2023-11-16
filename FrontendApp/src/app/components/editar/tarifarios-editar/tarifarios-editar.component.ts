import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarifario } from 'src/app/Models/Tarifario';
import { TarifariosService } from 'src/app/services/Tarifario/tarifarios.service';

@Component({
  selector: 'app-tarifarios-editar',
  templateUrl: './tarifarios-editar.component.html',
  styleUrls: ['./tarifarios-editar.component.css']
})
export class TarifariosEditarComponent {
  @Input() btnAcao: string = 'Editar';
  @Input() txtTitulo: string = 'Editar Tarifário';
  tarifario!: Tarifario;
  formulario!: FormGroup;

  constructor(private tarifariosService: TarifariosService, private route: ActivatedRoute, public router : Router){}

  ngOnInit(): void {
    const idTarifario = String(this.route.snapshot.paramMap.get('idTarifario'));

    this.tarifariosService.buscarTarifario(idTarifario).subscribe((data) => {
      this.tarifario = data;

      this.formulario = new FormGroup({
        Tarifa_hora: new FormControl(this.tarifario?.tarifa_hora, [Validators.required]),
        Tarifa_diaria: new FormControl(this.tarifario?.tarifa_diaria, [Validators.required]),
        Tarifa_mensal: new FormControl(this.tarifario?.tarifa_mensal, [Validators.required]),
      })
    })
  }
}

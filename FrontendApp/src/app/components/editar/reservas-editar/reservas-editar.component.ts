import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/Models/Reserva';
import { ReservasService } from 'src/app/services/Reserva/reservas.service';

@Component({
  selector: 'app-reservas-editar',
  templateUrl: './reservas-editar.component.html',
  styleUrls: ['./reservas-editar.component.css']
})
export class ReservasEditarComponent {
  @Input() btnAcao: string = 'Editar';
  @Input() txtTitulo: string = 'Editar Reserva';
  reserva!: Reserva;
  formulario!: FormGroup;

  constructor(private reservasService: ReservasService, private route: ActivatedRoute, public router : Router){}

  ngOnInit(): void {
    const reservaId = Number(this.route.snapshot.paramMap.get('reservaId'));

    console.log(reservaId)

    this.reservasService.buscarReserva(reservaId).subscribe((data) => {
      this.reserva = data;

      console.log(data);

      this.formulario = new FormGroup({
        data_hora_reserva: new FormControl( new Date(this.reserva?.data_hora_reserva!).toLocaleDateString('pt-BR'), [Validators.required]),
        cliente_cpf: new FormControl(this.reserva?.cliente_cpf, [Validators.required]),
        vaga_id: new FormControl(this.reserva?.vaga_id, [Validators.required]),
      })
    })
  }
}

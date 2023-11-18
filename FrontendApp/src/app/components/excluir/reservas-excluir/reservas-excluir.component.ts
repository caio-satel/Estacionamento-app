import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reserva } from 'src/app/Models/Reserva';
import { ReservasService } from 'src/app/services/Reserva/reservas.service';

@Component({
  selector: 'app-reservas-excluir',
  templateUrl: './reservas-excluir.component.html',
  styleUrls: ['./reservas-excluir.component.css']
})
export class ReservasExcluirComponent {
  inputdata: any;
  reserva!: Reserva;
  reservas: Reserva[] = [];

  constructor(private reservasService: ReservasService, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ReservasExcluirComponent>) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.reservasService.buscarReserva(this.inputdata.reservaId).subscribe((reserva) =>{
      this.reserva = reserva;

      console.log(reserva)
    })
  }

  Excluir(): void {
    this.reservasService.deletarReserva(this.inputdata.reservaId).subscribe((data) => {
        this.ref.close();
    })
    window.location.reload();
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reserva } from 'src/app/Models/Reserva';
import { ReservasService } from 'src/app/services/Reserva/reservas.service';
import { ReservasExcluirComponent } from '../excluir/reservas-excluir/reservas-excluir.component';
import { ClientesService } from 'src/app/services/Cliente/clientes.service';
import { VagasService } from 'src/app/services/Vaga/vagas.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {
  reservas: Reserva[] = [];
  reservaGeral: Reserva[] = [];
  colunas = ['Data', 'Cliente', 'Vaga', 'VagaTipo', 'Ações', 'Excluir'];
  
  constructor(private reservasService : ReservasService,  public dialog : MatDialog) { }

  ngOnInit(): void {
    this.reservasService.listarReservas().subscribe((data) => {
      this.reservas = data;
      this.reservaGeral = data;
    })
  }

  search(event : Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.reservas = this.reservaGeral?.filter(Reserva => {
      return Reserva.cliente_cpf.toLowerCase().includes(value);
    })
  }

  OpenDialog(reservaId: string, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(ReservasExcluirComponent, {
      data: {
        reservaId: reservaId
      },
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}

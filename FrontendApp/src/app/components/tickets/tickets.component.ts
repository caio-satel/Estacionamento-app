import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ticket } from 'src/app/Models/Ticket';
import { TicketsService } from 'src/app/services/Ticket/tickets.service';
import { ExcluirComponent } from '../excluir/excluir.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
  tickets: Ticket[] = [];
  ticketGeral: Ticket[] = [];
  colunas = ['Entrada', 'Saida', 'Total', 'Cliente', 'Placa', 'Ações', 'Excluir'];
  
  constructor(private ticketsService : TicketsService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.ticketsService.listarTickets().subscribe((data) => {
      this.tickets = data;
      this.ticketGeral = data;

      console.log(data)
    })
  }

  search(event : Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.tickets = this.ticketGeral?.filter(Ticket => {
      return Ticket.carro_placa.toLowerCase().includes(value);
    })
  }

  OpenDialog(codigo: number, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(ExcluirComponent, {
      data: {
        codigo: codigo
      },
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}

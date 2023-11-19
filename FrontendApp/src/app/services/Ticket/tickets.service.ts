import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/Models/Ticket';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class TicketsService {
  private apiUrl = `${environment.ApiUrl}/Ticket`

  constructor(private http: HttpClient) { }

  listarTickets(): Observable<Ticket[]> {
    const url = `${this.apiUrl}/listarTickets`;
    return this.http.get<Ticket[]>(url);
  }

  cadastrarTicket(ticket: Ticket): Observable<any> {
    const url = `${this.apiUrl}/criarTicket`;
    return this.http.post<Ticket>(url, ticket, httpOptions);
  }

  deletarTicket(codigo: number): Observable<any> {
    const url = `${this.apiUrl}/deletarTicket/${codigo}`;
    return this.http.delete<Ticket>(url, httpOptions);
  }
}

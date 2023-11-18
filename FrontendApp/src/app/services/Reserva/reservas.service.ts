import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from 'src/app/Models/Reserva';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ReservasService {
  private apiUrl = `${environment.ApiUrl}/Reserva`

  constructor(private http: HttpClient) { }

  listarReservas(): Observable<Reserva[]> {
    const url = `${this.apiUrl}/listarReservas`;
    return this.http.get<Reserva[]>(url);
  }

  buscarReserva(reservaId: number): Observable<Reserva> {
    const url = `${this.apiUrl}/buscarReserva/${reservaId}`;
    return this.http.get<Reserva>(url);
  }

  cadastrarReserva(reserva: Reserva): Observable<any> {
    const url = `${this.apiUrl}/cadastrarReserva`;
    return this.http.post<Reserva>(url, reserva, httpOptions);
  }

  editarReserva(reservaId: number, novoReserva: Reserva): Observable<any> {
    const url = `${this.apiUrl}/editar/${reservaId}`;
    return this.http.put<Reserva>(url, novoReserva, httpOptions)
  }

  deletarReserva(reservaId: number): Observable<any> {
    const url = `${this.apiUrl}/removerReserva/${reservaId}`;
    return this.http.delete<Reserva>(url, httpOptions);
  }
}

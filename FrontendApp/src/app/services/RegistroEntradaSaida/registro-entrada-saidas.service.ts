import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroEntradaSaida } from 'src/app/Models/RegistroEntradaSaida';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class RegistroEntradaSaidasService {
  private apiUrl = `${environment.ApiUrl}/RegistroEntradaSaida`

  constructor(private http: HttpClient) { }

  listarRegistroEntradaSaidas(): Observable<RegistroEntradaSaida[]> {
    const url = `${this.apiUrl}/listar`;
    return this.http.get<RegistroEntradaSaida[]>(url);
  }

  buscarRegistroEntradaSaida(registroId: number): Observable<RegistroEntradaSaida> {
    const url = `${this.apiUrl}/buscarRegistro/${registroId}`;
    return this.http.get<RegistroEntradaSaida>(url);
  }

  cadastrarRegistroEntradaSaida(registroES: RegistroEntradaSaida): Observable<any> {
    const url = `${this.apiUrl}/registrarEntrada/`;
    return this.http.post<RegistroEntradaSaida>(url, registroES, httpOptions);
  }

  editarRegistroEntradaSaida(vagaId: number, registroId: number): Observable<any> {
    const url = `${this.apiUrl}/registrarSaida/${vagaId}/${registroId}`;
    return this.http.put<RegistroEntradaSaida>(url,  httpOptions)
  }

  deletarRegistroEntradaSaida(registroId: number): Observable<any> {
    const url = `${this.apiUrl}/deletarRegistro/${registroId}`;
    return this.http.delete<RegistroEntradaSaida>(url, httpOptions);
  }
}

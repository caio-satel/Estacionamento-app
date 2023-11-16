import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarifario } from 'src/app/Models/Tarifario';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class TarifariosService {

  private apiUrl = `${environment.ApiUrl}/Tarifario`

  constructor(private http: HttpClient) { }

  listarTarifarios(): Observable<Tarifario[]> {
    const url = `${this.apiUrl}/listarTarifario`;
    return this.http.get<Tarifario[]>(url);
  }

  buscarTarifario(idTarifario: string): Observable<Tarifario> {
    const url = `${this.apiUrl}/buscar/${idTarifario}`;
    return this.http.get<Tarifario>(url);
  }

  cadastrarTarifario(tarifario: Tarifario): Observable<any> {
    const url = `${this.apiUrl}/criarTarifario`;
    return this.http.post<Tarifario>(url, tarifario, httpOptions);
  }

  editarTarifario(idTarifario: number, tarifario: Tarifario): Observable<any> {
    const url = `${this.apiUrl}/alterarTarifario/${idTarifario}`;
    return this.http.put<Tarifario>(url, tarifario)
  }

  deletarTarifario(idTarifario: number): Observable<any> {
    const url = `${this.apiUrl}/deletarTarifario/${idTarifario}`;
    return this.http.delete<Tarifario>(url);
  }
}

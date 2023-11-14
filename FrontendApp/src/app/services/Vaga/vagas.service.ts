import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vaga } from 'src/app/Models/Vaga';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class VagasService {
  private apiUrl = `${environment.ApiUrl}/Vaga`

  constructor(private http: HttpClient) { }

  listarVagas(): Observable<Vaga[]> {
    const url = `${this.apiUrl}/listar`;
    return this.http.get<Vaga[]>(url);
  }

  buscarVaga(vagaID: number): Observable<Vaga> {
    const url = `${this.apiUrl}/buscarVaga/${vagaID}`;
    return this.http.get<Vaga>(url);
  }

  listarVagasOcupadas(): Observable<Vaga[]> {
    const url = `${this.apiUrl}/listarVagasOcupadas`;
    return this.http.get<Vaga[]>(url);
  }

  listarVagasLivres(): Observable<Vaga[]> {
    const url = `${this.apiUrl}/listarVagasLivres`;
    return this.http.get<Vaga[]>(url);
  }

  cadastrarVaga(Vaga: Vaga): Observable<any> {
    const url = `${this.apiUrl}/cadastrar`;
    return this.http.post<Vaga>(url, Vaga, httpOptions);
  }

  ocuparVaga(vagaID: number, placaCarro: string): Observable<any> {
    const url = `${this.apiUrl}/ocuparVaga/${vagaID}`;
    return this.http.patch<Vaga>(url, {placaCarro}, httpOptions)
  }

  liberarVaga(vagaID: number): Observable<any> {
    const url = `${this.apiUrl}/liberarVaga/${vagaID}`;
    return this.http.patch<Vaga>(url, httpOptions)
  }

  alterarTipo(vagaID: string, novoTipo: string): Observable<any> {
    const url = `${this.apiUrl}/alterarPlaca/${vagaID}`;
    return this.http.patch<Vaga>(url, novoTipo, httpOptions)
  }

  deletarVaga(vagaID: string): Observable<any> {
    const url = `${this.apiUrl}/deletarVaga/${vagaID}`;
    return this.http.delete<Vaga>(url, httpOptions);
  }
}

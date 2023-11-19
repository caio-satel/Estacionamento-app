import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conta } from 'src/app/Models/Conta';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ContasService {
  private apiUrl = `${environment.ApiUrl}/Conta`

  constructor(private http: HttpClient) { }

  listarContas(): Observable<Conta[]> {
    const url = `${this.apiUrl}/listarContas`;
    return this.http.get<Conta[]>(url);
  }

  listarContaClienteEspecifico(cpf: string): Observable<Conta[]> {
    const url = `${this.apiUrl}/listarContaClienteEspecifico/${cpf}`;
    return this.http.get<Conta[]>(url);
  }

  buscarConta(contaId: number): Observable<Conta> {
    const url = `${this.apiUrl}/buscarConta/${contaId}`;
    return this.http.get<Conta>(url);
  }

  criarConta(conta: Conta): Observable<any> {
    const url = `${this.apiUrl}/criarConta`;
    return this.http.post<Conta>(url, conta, httpOptions);
  }

  atualizarConta(contaId: number, novaConta : Conta): Observable<any> {
    const url = `${this.apiUrl}/atualizarConta/${contaId}`;
    return this.http.put<Conta>(url, novaConta, httpOptions)
  }

  deletarConta(contaId: number): Observable<any> {
    const url = `${this.apiUrl}/deletarConta/${contaId}`;
    return this.http.delete<Conta>(url, httpOptions);
  }
}

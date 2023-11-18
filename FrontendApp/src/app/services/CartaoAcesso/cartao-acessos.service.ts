import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartaoAcesso } from 'src/app/Models/CartaoAcesso';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class CartaoAcessosService {
  private apiUrl = `${environment.ApiUrl}/CartaoAcesso`

  constructor(private http: HttpClient) { }

  listarCartaoAcessos(): Observable<CartaoAcesso[]> {
    const url = `${this.apiUrl}/listarCartoes`;
    return this.http.get<CartaoAcesso[]>(url);
  }

  listarCartoesVencidos(): Observable<CartaoAcesso[]> {
    const url = `${this.apiUrl}/listarCartoesVencidos`;
    return this.http.get<CartaoAcesso[]>(url);
  }

  buscarCartaoAcesso(idCartao: number): Observable<CartaoAcesso> {
    const url = `${this.apiUrl}/buscarCartaoAcesso/${idCartao}`;
    return this.http.get<CartaoAcesso>(url);
  }

  cadastrarCartaoAcesso(cartaoAcesso: CartaoAcesso): Observable<any> {
    const url = `${this.apiUrl}/criarCartao`;
    return this.http.post<CartaoAcesso>(url, cartaoAcesso, httpOptions);
  }

  validarCartao(idCartao: number): Observable<any> {
    const url = `${this.apiUrl}/alterarValidade/${idCartao}`;
    return this.http.patch<CartaoAcesso>(url, httpOptions)
  }

  deletarCartaoAcesso(idCartao: number): Observable<any> {
    const url = `${this.apiUrl}/deletarCartao/${idCartao}`;
    return this.http.delete<CartaoAcesso>(url, httpOptions);
  }

}

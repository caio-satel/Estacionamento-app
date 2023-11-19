import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagamento } from 'src/app/Models/Pagamento';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class PagamentosService {
  private apiUrl = `${environment.ApiUrl}/Pagamento`

  constructor(private http: HttpClient) { }

  listarPagamentos(): Observable<Pagamento[]> {
    const url = `${this.apiUrl}/listarPagamentos`;
    return this.http.get<Pagamento[]>(url);
  }

  buscarPagamento(idPagamento: number): Observable<Pagamento> {
    const url = `${this.apiUrl}/buscarPagamento/${idPagamento}`;
    return this.http.get<Pagamento>(url);
  }

  registrarPagamento(pagamento: Pagamento): Observable<any> {
    const url = `${this.apiUrl}/registrarPagamento`;
    return this.http.post<Pagamento>(url, pagamento, httpOptions);
  }

  atualizarPagamento(idPagamento: number, novoPagamento : Pagamento): Observable<any> {
    const url = `${this.apiUrl}/alterarPagamento/${idPagamento}`;
    return this.http.put<Pagamento>(url, novoPagamento, httpOptions)
  }

  deletarPagamento(idPagamento: number): Observable<any> {
    const url = `${this.apiUrl}/deletarPagamento/${idPagamento}`;
    return this.http.delete<Pagamento>(url, httpOptions);
  }
}

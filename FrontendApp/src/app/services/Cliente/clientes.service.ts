import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/Models/Cliente';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  private apiUrl = `${environment.ApiUrl}/Cliente`

  constructor(private http: HttpClient) { }

  listarClientes(): Observable<Cliente[]> {
    const url = `${this.apiUrl}/listar`;
    return this.http.get<Cliente[]>(url);
  }

  buscarCliente(cpf: string): Observable<Cliente> {
    const url = `${this.apiUrl}/buscar/${cpf}`;
    return this.http.get<Cliente>(url);
  }

  cadastrarCliente(cliente: Cliente): Observable<any> {
    const url = `${this.apiUrl}/cadastrar`;
    return this.http.post<Cliente>(url, cliente, httpOptions);
  }

  editarCliente(cpf: string, cliente: Cliente): Observable<any> {
    const url = `${this.apiUrl}/editar/${cpf}`;
    return this.http.put<Cliente>(url, cliente, httpOptions)
  }

  deletarCliente(cpf: string): Observable<any> {
    const url = `${this.apiUrl}/deletar/${cpf}`;
    return this.http.delete<string>(url, httpOptions);
  }
}

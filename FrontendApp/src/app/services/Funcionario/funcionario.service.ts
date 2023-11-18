import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from 'src/app/Models/Funcionario';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {
  private apiUrl = `${environment.ApiUrl}/Funcionario`

  constructor(private http: HttpClient) { }

  listarFuncionarios(): Observable<Funcionario[]> {
    const url = `${this.apiUrl}/listarFuncionarios`;
    return this.http.get<Funcionario[]>(url);
  }

  buscarFuncionario(matricula: string): Observable<Funcionario> {
    const url = `${this.apiUrl}/buscarFuncionario/${matricula}`;
    return this.http.get<Funcionario>(url);
  }

  cadastrarFuncionario(funcionario: Funcionario): Observable<any> {
    const url = `${this.apiUrl}/cadastrarFuncionario`;
    return this.http.post<Funcionario>(url, funcionario, httpOptions);
  }

  editarFuncionario(matricula: string, novoFuncionario: Funcionario): Observable<any> {
    const url = `${this.apiUrl}/editar/${matricula}`;
    return this.http.put<Funcionario>(url, novoFuncionario, httpOptions)
  }

  deletarFuncionario(matricula: string): Observable<any> {
    const url = `${this.apiUrl}/deletarFuncionario/${matricula}`;
    return this.http.delete<Funcionario>(url, httpOptions);
  }
}

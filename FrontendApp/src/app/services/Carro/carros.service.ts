import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../../Models/Carro';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class CarrosService {
  private apiUrl = `${environment.ApiUrl}/Carro`

  constructor(private http: HttpClient) { }

  listarCarros(): Observable<Carro[]> {
    const url = `${this.apiUrl}/listar`;
    return this.http.get<Carro[]>(url);
  }

  buscarCarro(placa: string): Observable<Carro> {
    const url = `${this.apiUrl}/buscar/${placa}`;
    return this.http.get<Carro>(url);
  }

  cadastrarCarro(cpf: string, carro: Carro): Observable<any> {
    const url = `${this.apiUrl}/cadastrar/${cpf}`;
    return this.http.post<Carro>(url, carro, httpOptions);
  }

  editarCarro(placa: string, novoCarro: Carro): Observable<any> {
    const url = `${this.apiUrl}/editar/${placa}`;
    return this.http.put<Carro>(url, novoCarro, httpOptions)
  }

  alterarPlaca(placa: string, carro: Carro): Observable<any> {
    const url = `${this.apiUrl}/alterarPlaca/${placa}`;
    return this.http.patch<Carro>(url, carro, httpOptions)
  }

  alterarCor(placa: string, carro: Carro): Observable<any> {
    const url = `${this.apiUrl}/alterarCor/${placa}`;
    return this.http.patch<Carro>(url, carro, httpOptions)
  }

  deletarCarro(placa: string): Observable<any> {
    const url = `${this.apiUrl}/deletar/${placa}`;
    return this.http.delete<Carro>(url, httpOptions);
  }
}

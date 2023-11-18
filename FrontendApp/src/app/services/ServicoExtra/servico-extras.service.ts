import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicoExtra } from 'src/app/Models/ServicoExtra';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ServicoExtrasService {
  private apiUrl = `${environment.ApiUrl}/ServicoExtra`

  constructor(private http: HttpClient) { }

  listarServicoExtra(): Observable<ServicoExtra[]> {
    const url = `${this.apiUrl}/listarServicosExtra`;
    return this.http.get<ServicoExtra[]>(url);
  }

  listarServicoCliente(clienteCpf: string): Observable<ServicoExtra[]> {
    const url = `${this.apiUrl}/listarCartoesVencidos/${clienteCpf}`;
    return this.http.get<ServicoExtra[]>(url);
  }

  buscarServicoExtra(servicoId: number): Observable<ServicoExtra> {
    const url = `${this.apiUrl}/buscarServico/${servicoId}`;
    return this.http.get<ServicoExtra>(url);
  }

  cadastrarServicoExtra(servicoExtra: ServicoExtra): Observable<any> {
    const url = `${this.apiUrl}/registrarServico`;
    return this.http.post<ServicoExtra>(url, servicoExtra, httpOptions);
  }

  atualizarServico(servicoId: number, novoServico : ServicoExtra): Observable<any> {
    const url = `${this.apiUrl}/atualizarServico/${servicoId}`;
    return this.http.put<ServicoExtra>(url, novoServico, httpOptions)
  }

  deletarServicoExtra(servicoId: number): Observable<any> {
    const url = `${this.apiUrl}/deletarServico/${servicoId}`;
    return this.http.delete<ServicoExtra>(url, httpOptions);
  }
}

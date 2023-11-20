import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../../Models/Carro';
import { environment } from 'src/environments/environment.development';

//Configurando httpOptions para passar como argumento ao fazer a chamada HTTP, 
//especifica que o conteudo da solicitação deve ser tratado como JSON
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

// Decoretor que permite a injeção desse serviço globalmente
@Injectable({
  providedIn: 'root'
})

export class CarrosService {
  private apiUrl = `${environment.ApiUrl}/Carro`

  // Garante que esses serviços possam fazer requisições HTTP,
  // ao instanciar esses serviços (CarrosService), automaticamente injeta uma instancia de HttpClient também
  constructor(private http: HttpClient) { }

  //Observable: um observador do 'conteudo' indentificando todas as mudanças realizadas,
  //reage as mudanças de eventos e valores. Usado em operações async
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
    return this.http.delete<Carro>(url);
  }
}

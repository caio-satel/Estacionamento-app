import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServicoExtra } from 'src/app/Models/ServicoExtra';
import { ServicoExtrasService } from 'src/app/services/ServicoExtra/servico-extras.service';
import { ServicosExcluirComponent } from '../excluir/servicos-excluir/servicos-excluir.component';

@Component({
  selector: 'app-servico-extras',
  templateUrl: './servico-extras.component.html',
  styleUrls: ['./servico-extras.component.css']
})
export class ServicoExtrasComponent {
  servicos: ServicoExtra[] = [];
  servicoGeral: ServicoExtra[] = [];
  colunas = ['Descrição', 'Custo', 'Cliente', 'Carro', 'Funcionario', 'Ações', 'Excluir'];
  
  constructor(private servicosService : ServicoExtrasService,  public dialog : MatDialog) { }

  ngOnInit(): void {
    this.servicosService.listarServicoExtra().subscribe((data) => {
      this.servicos = data;
      this.servicoGeral = data;
    })
  }

  search(event : Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.servicos = this.servicoGeral?.filter(ServicoExtra => {
      return ServicoExtra.descricao.toLowerCase().includes(value);
    })
  }

  OpenDialog(servicoId: number, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(ServicosExcluirComponent, {
      data: {
        servicoId: servicoId
      },
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}

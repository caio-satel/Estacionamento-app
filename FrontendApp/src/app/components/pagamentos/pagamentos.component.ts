import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pagamento } from 'src/app/Models/Pagamento';
import { PagamentosService } from 'src/app/services/Pagamento/pagamentos.service';
import { ExcluirComponent } from '../excluir/excluir.component';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.css']
})
export class PagamentosComponent {
  pagamentos: Pagamento[] = [];
  pagamentoGeral: Pagamento[] = [];
  colunas = ['Data', 'Valor', 'Conta', 'Ticket', 'Ações', 'Excluir'];
  
  constructor(private pagamentosService : PagamentosService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.pagamentosService.listarPagamentos().subscribe((data) => {
      this.pagamentos = data;
      this.pagamentoGeral = data;

      console.log(data)
    })
  }

  search(event : Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.pagamentos = this.pagamentoGeral?.filter(Pagamento => {
      return Pagamento.valor_pago;
    })
  }

  OpenDialog(idPagamento: number, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(ExcluirComponent, {
      data: {
        idPagamento: idPagamento
      },
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}

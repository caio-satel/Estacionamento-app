import { Component, Inject } from '@angular/core';
import { CartaoAcesso } from 'src/app/Models/CartaoAcesso';
import { ReservasExcluirComponent } from '../reservas-excluir/reservas-excluir.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartaoAcessosService } from 'src/app/services/CartaoAcesso/cartao-acessos.service';

@Component({
  selector: 'app-cartoes-excluir',
  templateUrl: './cartoes-excluir.component.html',
  styleUrls: ['./cartoes-excluir.component.css']
})
export class CartoesExcluirComponent {
  inputdata: any;
  cartao!: CartaoAcesso;
  cartoes: CartaoAcesso[] = [];

  constructor(private cartaoService: CartaoAcessosService, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ReservasExcluirComponent>) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.cartaoService.buscarCartaoAcesso(this.inputdata.idCartao).subscribe((cartao) =>{
      this.cartao = cartao;

      console.log(cartao)
    })
  }

  Excluir(): void {
    this.cartaoService.deletarCartaoAcesso(this.inputdata.idCartao).subscribe((data) => {
        this.ref.close();
    })
    window.location.reload();
  }
}

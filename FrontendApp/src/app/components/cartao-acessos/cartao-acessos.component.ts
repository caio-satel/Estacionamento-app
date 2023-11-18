import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartaoAcesso } from 'src/app/Models/CartaoAcesso';
import { CartaoAcessosService } from 'src/app/services/CartaoAcesso/cartao-acessos.service';
import { CartoesExcluirComponent } from '../excluir/cartoes-excluir/cartoes-excluir.component';

@Component({
  selector: 'app-cartao-acessos',
  templateUrl: './cartao-acessos.component.html',
  styleUrls: ['./cartao-acessos.component.css']
})
export class CartaoAcessosComponent {
  cartoes: CartaoAcesso[] = [];
  cartoesGeral: CartaoAcesso[] = [];
  colunas = ['Validade', 'Cliente', 'Ações', 'Excluir'];
  
  constructor(private cartoesService : CartaoAcessosService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.cartoesService.listarCartaoAcessos().subscribe((data) => {
      this.cartoes = data;
      this.cartoesGeral = data;
    })
   
  }

  search(event : Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.cartoes = this.cartoesGeral?.filter(CartaoAcesso => {
      return CartaoAcesso.cliente_cpf.toLowerCase().includes(value);
    })
  }

  OpenDialog(idCartao: number, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(CartoesExcluirComponent, {
      data: {
        idCartao: idCartao
      },
      enterAnimationDuration,
      exitAnimationDuration
    });
  }


}

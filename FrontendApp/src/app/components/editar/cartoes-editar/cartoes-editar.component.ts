import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartaoAcesso } from 'src/app/Models/CartaoAcesso';
import { CartaoAcessosService } from 'src/app/services/CartaoAcesso/cartao-acessos.service';

@Component({
  selector: 'app-cartoes-editar',
  templateUrl: './cartoes-editar.component.html',
  styleUrls: ['./cartoes-editar.component.css']
})
export class CartoesEditarComponent {
  @Input() btnAcao: string = 'Editar';
  @Input() txtTitulo: string = 'Editar Cartão';
  cartao!: CartaoAcesso;
  formulario!: FormGroup;

  constructor(private cartaoService: CartaoAcessosService, private route: ActivatedRoute, public router : Router){}

  ngOnInit(): void {
    const idCartao = Number(this.route.snapshot.paramMap.get('idCartao'));

    this.cartaoService.buscarCartaoAcesso(idCartao).subscribe((data) => {
      this.cartao = data;

      console.log(data);

      this.formulario = new FormGroup({
        cliente_Cpf: new FormControl(this.cartao?.cliente_cpf, [Validators.required]),
      })
    });
  }
}

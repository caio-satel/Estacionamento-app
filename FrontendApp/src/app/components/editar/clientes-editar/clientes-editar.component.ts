import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/Models/Cliente';
import { ClientesService } from 'src/app/services/Cliente/clientes.service';

@Component({
  selector: 'app-clientes-editar',
  templateUrl: './clientes-editar.component.html',
  styleUrls: ['./clientes-editar.component.css']
})
export class ClientesEditarComponent {
  formulario!: FormGroup;
  @Input() btnAcao: string = 'Editar';
  @Input() txtTitulo: string = 'Editar Cliente';
  cliente!: Cliente;


  constructor(private clientesService: ClientesService, private route: ActivatedRoute, public router : Router){}

  ngOnInit(): void {
    const cpf = String(this.route.snapshot.paramMap.get('cpf'));

    this.clientesService.buscarCliente(cpf).subscribe((data) => {
      this.cliente = data;

      this.formulario = new FormGroup({
        cpf: new FormControl(this.cliente?.cpf, [Validators.required]),
        nome: new FormControl(this.cliente?.nome, [Validators.required]),
        telefone: new FormControl(this.cliente?.telefone, [Validators.required]),
      })
    })
  }
}

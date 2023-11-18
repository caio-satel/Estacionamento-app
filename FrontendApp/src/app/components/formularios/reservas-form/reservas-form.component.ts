import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Models/Cliente';
import { Reserva } from 'src/app/Models/Reserva';
import { Vaga } from 'src/app/Models/Vaga';
import { ClientesService } from 'src/app/services/Cliente/clientes.service';
import { ReservasService } from 'src/app/services/Reserva/reservas.service';
import { VagasService } from 'src/app/services/Vaga/vagas.service';

@Component({
  selector: 'app-reservas-form',
  templateUrl: './reservas-form.component.html',
  styleUrls: ['./reservas-form.component.css'],
})
export class ReservasFormComponent {
  formulario: any;
  clientes: Cliente[] = [];
  vagas: Vaga[] = [];
  @Input() modoEdicao: boolean = false;
  @Input() btnAcao: string = 'Salvar';
  @Input() txtTitulo: string = 'Reservar Vaga';
  @Input() dadosReserva: Reserva | null = null;

  constructor(
    private reservasServices: ReservasService,
    private clientesServices: ClientesService,
    private vagasServices: VagasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientesServices.listarClientes().subscribe((data) => {
      this.clientes = data;
    });

    this.vagasServices.listarVagasLivres().subscribe((data) => {
      this.vagas = data;
    });

    this.modoEdicao = !!this.dadosReserva;

    this.formulario = new FormGroup({
      data_hora_reserva: new FormControl(
        this.dadosReserva ? new Date(this.dadosReserva.data_hora_reserva) : null, [Validators.required]
      ),
      cliente_Cpf: new FormControl(
        this.dadosReserva ? this.dadosReserva.cliente_cpf : null,
        [Validators.required]
      ),
      vaga_Id: new FormControl(
        this.dadosReserva ? this.dadosReserva.vaga_id : null,
        [Validators.required]
      ),
    });
  }

  enviarFormulario(): void {
    const reserva = this.formulario.value;
    console.log(reserva)

    if (this.modoEdicao && this.dadosReserva) {
      const reservaId: number = this.dadosReserva.reservaId;
      this.reservasServices
        .editarReserva(reservaId, reserva)
        .subscribe(() => {});
    } else {
      this.reservasServices.cadastrarReserva(reserva).subscribe(() => {});
    }
    this.router.navigate(['/reservas']);
  }

}

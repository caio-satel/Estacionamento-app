import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Carro } from 'src/app/Models/Carro';
import { RegistroEntradaSaida } from 'src/app/Models/RegistroEntradaSaida';
import { Vaga } from 'src/app/Models/Vaga';
import { CarrosService } from 'src/app/services/Carro/carros.service';
import { RegistroEntradaSaidasService } from 'src/app/services/RegistroEntradaSaida/registro-entrada-saidas.service';
import { VagasService } from 'src/app/services/Vaga/vagas.service';

@Component({
  selector: 'app-registro-entrada-saida-form',
  templateUrl: './registro-entrada-saida-form.component.html',
  styleUrls: ['./registro-entrada-saida-form.component.css']
})
export class RegistroEntradaSaidaFormComponent {
  formulario: any;
  carros: Carro[] = [];
  vagas: Vaga[] = [];
  @Input() modoEdicao: boolean = false;
  @Input() btnAcao: string = 'Salvar';
  @Input() txtTitulo: string = 'Cadastrar Registro';
  @Input() dadosRegistro: RegistroEntradaSaida | null = null;

  constructor(
    private carrosServices: CarrosService,
    private registrosService: RegistroEntradaSaidasService,
    private vagasServices: VagasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carrosServices.listarCarros().subscribe((data) => {
      this.carros = data;
    });

    this.vagasServices.listarVagasLivres().subscribe((data) => {
      this.vagas = data;
    });

    this.modoEdicao = !!this.dadosRegistro;

    this.formulario = new FormGroup({
      carro_Placa: new FormControl(this.dadosRegistro ? this.dadosRegistro.carro_placa : null, [
        Validators.required,
      ]),
      vaga_Id: new FormControl(this.dadosRegistro ? this.dadosRegistro.vaga_id : null, [
        Validators.required,
      ]),
    });
  }

  enviarFormulario(): void {
    const registro: RegistroEntradaSaida = this.formulario.value;
  
    if (this.modoEdicao && this.dadosRegistro) {
      const vagaId: number = this.dadosRegistro.vaga_id;
      const registroId: number = this.dadosRegistro.registroId;

      this.registrosService.editarRegistroEntradaSaida(vagaId, registroId).subscribe(() => {
      
      });
    } else {
      this.registrosService.cadastrarRegistroEntradaSaida(registro).subscribe(() => {
        
      });
    }
    this.router.navigate(['/registros']);
  }
}

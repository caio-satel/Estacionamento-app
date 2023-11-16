import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarifario } from 'src/app/Models/Tarifario';
import { TarifariosService } from 'src/app/services/Tarifario/tarifarios.service';

@Component({
  selector: 'app-tarifarios-form',
  templateUrl: './tarifarios-form.component.html',
  styleUrls: ['./tarifarios-form.component.css'],
})
export class TarifariosFormComponent {
  formulario: any;
  @Input() modoEdicao: boolean = false;
  @Input() btnAcao: string = 'Salvar';
  @Input() txtTitulo: string = 'Cadastrar Tarifário';
  @Input() dadosTarifario: Tarifario | null = null;

  constructor(
    private tarifariosService: TarifariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.modoEdicao = !!this.dadosTarifario;

    this.formulario = new FormGroup({
      Tarifa_hora: new FormControl(
        this.dadosTarifario ? this.dadosTarifario.tarifa_hora : null,
        [Validators.required]
      ),
      Tarifa_diaria: new FormControl(
        this.dadosTarifario ? this.dadosTarifario.tarifa_diaria : null,
        [Validators.required]
      ),
      Tarifa_mensal: new FormControl(
        this.dadosTarifario ? this.dadosTarifario.tarifa_mensal : null,
        [Validators.required]
      ),
    });
  }

  enviarFormulario(): void {
    const tarifario: Tarifario = this.formulario.value;

    if (this.modoEdicao && this.dadosTarifario) {
      const idTarifario: number = this.dadosTarifario.idTarifario;
      this.tarifariosService.editarTarifario(idTarifario, tarifario).subscribe(() => {

      });
    } else {
      this.tarifariosService.cadastrarTarifario(tarifario).subscribe(() => {

      });
    }
    this.router.navigate(['/tarifarios']);
  }
}

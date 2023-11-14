import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vaga } from 'src/app/Models/Vaga';
import { VagasService } from 'src/app/services/Vaga/vagas.service';

@Component({
  selector: 'app-vagas-form',
  templateUrl: './vagas-form.component.html',
  styleUrls: ['./vagas-form.component.css']
})
export class VagasFormComponent {
  formulario : any;
  @Input() btnAcao: string = 'Salvar';
  @Input() txtTitulo: string = 'Cadastrar Vaga';
  @Input() dadosVaga: Vaga | null = null;

  constructor(private vagasServices : VagasService, private router : Router) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      tipo: new FormControl(this.dadosVaga ? this.dadosVaga.tipo : null, [Validators.required])
    })
  }
  
  enviarFormulario(): void {
    const vaga : Vaga = this.formulario.value;
    this.vagasServices.cadastrarVaga(vaga).subscribe(() => {
      window.location.reload();
    })
    this.router.navigate(['/vagas']);
  } 
}

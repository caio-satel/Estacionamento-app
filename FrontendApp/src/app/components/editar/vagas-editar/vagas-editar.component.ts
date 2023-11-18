import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaga } from 'src/app/Models/Vaga';
import { VagasService } from 'src/app/services/Vaga/vagas.service';

@Component({
  selector: 'app-vagas-editar',
  templateUrl: './vagas-editar.component.html',
  styleUrls: ['./vagas-editar.component.css']
})
export class VagasEditarComponent {
  @Input() btnAcao: string = 'Editar';
  @Input() txtTitulo: string = 'Editar Vaga';
  vaga!: Vaga;
  formulario!: FormGroup;

  constructor(private vagasService: VagasService, private route: ActivatedRoute, public router : Router){}

  ngOnInit(): void {
    const vagaId = Number(this.route.snapshot.paramMap.get('vagaId'));

    this.vagasService.buscarVaga(vagaId).subscribe((data) => {
      this.vaga = data;

      console.log(data);

      this.formulario = new FormGroup({
        tipo: new FormControl(this.vaga?.tipo, [Validators.required]),
      })
    })
  }
}

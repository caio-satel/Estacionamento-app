import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tarifario } from 'src/app/Models/Tarifario';
import { TarifariosService } from 'src/app/services/Tarifario/tarifarios.service';

@Component({
  selector: 'app-tarifarios-excluir',
  templateUrl: './tarifarios-excluir.component.html',
  styleUrls: ['./tarifarios-excluir.component.css']
})
export class TarifariosExcluirComponent {
  inputdata: any;
  tarifario!: Tarifario
  tarifarios: Tarifario[] = [];

  constructor(private tarifariosService: TarifariosService, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<TarifariosExcluirComponent>) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.tarifariosService.buscarTarifario(this.inputdata.idTarifario).subscribe((tarifario) =>{
      this.tarifario = tarifario;
    })
  }

  Excluir(): void {
    this.tarifariosService.deletarTarifario(this.inputdata.idTarifario).subscribe((data) => {
        this.ref.close();
    })
    window.location.reload();
  }
}

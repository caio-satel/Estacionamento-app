import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegistroEntradaSaida } from 'src/app/Models/RegistroEntradaSaida';
import { ExcluirComponent } from '../excluir.component';
import { RegistroEntradaSaidasService } from 'src/app/services/RegistroEntradaSaida/registro-entrada-saidas.service';

@Component({
  selector: 'app-registro-entrada-saida-excluir',
  templateUrl: './registro-entrada-saida-excluir.component.html',
  styleUrls: ['./registro-entrada-saida-excluir.component.css']
})
export class RegistroEntradaSaidaExcluirComponent {
  inputdata: any;
  registro!: RegistroEntradaSaida
  registros: RegistroEntradaSaida[] = [];

  constructor(private registrosService: RegistroEntradaSaidasService, @Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<RegistroEntradaSaidaExcluirComponent>) {}

  ngOnInit(): void {
    this.inputdata = this.data;

    console.log(this.data)

    this.registrosService.buscarRegistroEntradaSaida(this.inputdata.registroId).subscribe((registro) =>{
      this.registro = registro;
    })
  }

  Excluir(): void {
    this.registrosService.deletarRegistroEntradaSaida(this.inputdata.registroId).subscribe((data) => {
        this.ref.close();
    })
  }
}

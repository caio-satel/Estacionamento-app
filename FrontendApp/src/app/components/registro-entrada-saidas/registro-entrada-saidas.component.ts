import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistroEntradaSaida } from 'src/app/Models/RegistroEntradaSaida';
import { RegistroEntradaSaidasService } from 'src/app/services/RegistroEntradaSaida/registro-entrada-saidas.service';
import { ExcluirComponent } from '../excluir/excluir.component';
import { RegistroEntradaSaidaExcluirComponent } from '../excluir/registro-entrada-saida-excluir/registro-entrada-saida-excluir.component';

@Component({
  selector: 'app-registro-entrada-saidas',
  templateUrl: './registro-entrada-saidas.component.html',
  styleUrls: ['./registro-entrada-saidas.component.css']
})
export class RegistroEntradaSaidasComponent {
  registros: RegistroEntradaSaida[] = [];
  registroGeral: RegistroEntradaSaida[] = [];
  colunas = ['Entrada', 'Saida', 'Placa', 'Vaga', 'Ações', 'Excluir'];
  
  constructor(private registrosService : RegistroEntradaSaidasService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.registrosService.listarRegistroEntradaSaidas().subscribe((data) => {
      this.registros = data;
      this.registroGeral = data;

      console.log(data)
    })
  }

  search(event : Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.registros = this.registroGeral?.filter(RegistroEntradaSaida => {
      return RegistroEntradaSaida.carro_placa.toLowerCase().includes(value);
    })
  }

  OpenDialog(registroId: number, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(RegistroEntradaSaidaExcluirComponent, {
      data: {
        registroId: registroId
      },
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tarifario } from 'src/app/Models/Tarifario';
import { TarifariosService } from 'src/app/services/Tarifario/tarifarios.service';
import { TarifariosExcluirComponent } from '../excluir/tarifarios-excluir/tarifarios-excluir.component';

@Component({
  selector: 'app-tarifarios',
  templateUrl: './tarifarios.component.html',
  styleUrls: ['./tarifarios.component.css']
})
export class TarifariosComponent {
  tarifarios: Tarifario[] = [];
  tarifarioGeral: Tarifario[] = [];
  colunas = ['ID', 'TarifaHora', 'TarifaDiaria', 'TarifaMensal', 'Ações', 'Excluir'];
  
  constructor(private tarifariosService : TarifariosService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.tarifariosService.listarTarifarios().subscribe((data) => {
      this.tarifarios = data;
      this.tarifarioGeral = data;
    })
  }

  OpenDialog(idTarifario: string, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(TarifariosExcluirComponent, {
      data: {
        idTarifario: idTarifario
      },
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}

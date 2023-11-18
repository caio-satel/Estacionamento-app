import { Component } from '@angular/core';
import { Vaga } from 'src/app/Models/Vaga';
import { VagasService } from 'src/app/services/Vaga/vagas.service';
import { VagasExcluirComponent } from '../excluir/vagas-excluir/vagas-excluir.component';
import { MatDialog } from '@angular/material/dialog';
import { OcuparVagaComponent } from '../dialog/ocupar-vaga/ocupar-vaga.component';
import { ReservasService } from 'src/app/services/Reserva/reservas.service';

@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.component.html',
  styleUrls: ['./vagas.component.css']
})
export class VagasComponent {
  vagas: Vaga[] = [];
  vagaGeral: Vaga[] = [];
  colunas = ['VagaID', 'Situação', 'Tipo', 'Placa', 'Ações', 'Excluir'];
  
  constructor(private vagasService : VagasService, private reservasServices : ReservasService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.carregarVagas();
  }

  carregarVagas(): void {
    this.vagasService.listarVagas().subscribe((data) => {
      this.vagas = data;
      this.vagaGeral = data;
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.vagas = this.vagaGeral?.filter((vaga) => {
      return vaga.tipo.toLowerCase().includes(value);
    });
  }

  liberarVaga(vaga: Vaga): void {
    // Chame o serviço para liberar a vaga
    this.vagasService.liberarVaga(vaga.vagaId).subscribe(() => {
      this.carregarVagas();
    });
    window.location.reload();
  }

  ocuparVaga(vagaId: number, placaCarro: string): void {
    // Chame o serviço para ocupar a vaga
    this.vagasService.ocuparVaga(vagaId, placaCarro).subscribe(() => {
      // Atualize a lista de vagas após ocupar a vaga
      this.carregarVagas();
    });
  }

  abrirDialogOcuparVaga(vagaId: number): void {
    const dialogRef = this.dialog.open(OcuparVagaComponent, {
      width: '300px',
      height: '300px',
      data: { vagaId: vagaId }
    });

    dialogRef.afterClosed().subscribe(placaCarro => {
      if (placaCarro) {
        this.ocuparVaga(vagaId, placaCarro);
      }
    });
  }

  OpenDialog(vagaId: number, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(VagasExcluirComponent, {
      data: {
        vagaId: vagaId
      },
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}

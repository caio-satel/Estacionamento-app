import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Services */
import { CarrosService } from './services/Carro/carros.service';
import { ClientesService } from './services/Cliente/clientes.service';
import { CartaoAcessosService } from './services/CartaoAcesso/cartao-acessos.service';
import { ContasService } from './services/Conta/contas.service';
import { FuncionarioService } from './services/Funcionario/funcionario.service';
import { RegistroEntradaSaidasService } from './services/RegistroEntradaSaida/registro-entrada-saidas.service';
import { TicketsService } from './services/Ticket/tickets.service';
import { ReservasService } from './services/Reserva/reservas.service';
import { VagasService } from './services/Vaga/vagas.service';
import { ServicoExtrasService } from './services/ServicoExtra/servico-extras.service';
import { TarifariosService } from './services/Tarifario/tarifarios.service';
import { PagamentosService } from './services/Pagamento/pagamentos.service';

/* Components */
import { CarrosComponent } from './components/carros/carros.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro/cadastro.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CartaoAcessosComponent } from './components/cartao-acessos/cartao-acessos.component';
import { ContasComponent } from './components/contas/contas.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { PagamentosComponent } from './components/pagamentos/pagamentos.component';
import { RegistroEntradaSaidasComponent } from './components/registro-entrada-saidas/registro-entrada-saidas.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { ServicoExtrasComponent } from './components/servico-extras/servico-extras.component';
import { TarifariosComponent } from './components/tarifarios/tarifarios.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { VagasComponent } from './components/vagas/vagas.component';
import { RegistroEntradaSaidaFormComponent } from './components/formularios/registro-entrada-saida-form/registro-entrada-saida-form.component';

/* Forms */
import { CarrosFormComponent } from './components/formularios/carros-form/carros-form.component';
import { ClientesFormComponent } from './components/formularios/clientes-form/clientes-form.component';
import { FuncionariosFormComponent } from './components/formularios/funcionarios-form/funcionarios-form.component';
import { VagasFormComponent } from './components/formularios/vagas-form/vagas-form.component';
import { TicketFormComponent } from './components/formularios/ticket-form/ticket-form.component';
import { TarifariosFormComponent } from './components/formularios/tarifarios-form/tarifarios-form.component';
import { ReservasFormComponent } from './components/formularios/reservas-form/reservas-form.component';
import { CartoesFormComponent } from './components/formularios/cartoes-form/cartoes-form.component';
import { ServicosFormComponent } from './components/formularios/servicos-form/servicos-form.component';
import { ContasFormComponent } from './components/formularios/contas-form/contas-form.component';

/* Edits */
import { CarrosEditarComponent } from './components/editar/carros-editar/carros-editar.component';
import { ClientesEditarComponent } from './components/editar/clientes-editar/clientes-editar.component';
import { TarifariosEditarComponent } from './components/editar/tarifarios-editar/tarifarios-editar.component';
import { FuncionariosEditarComponent } from './components/editar/funcionarios-editar/funcionarios-editar.component';
import { VagasEditarComponent } from './components/editar/vagas-editar/vagas-editar.component';
import { ReservasEditarComponent } from './components/editar/reservas-editar/reservas-editar.component';
import { ServicosEditarComponent } from './components/editar/servicos-editar/servicos-editar.component';
import { CartoesEditarComponent } from './components/editar/cartoes-editar/cartoes-editar.component';
import { ContasEditarComponent } from './components/editar/contas-editar/contas-editar.component';
import { RegistroEntradaSaidaEditarComponent } from './components/editar/registro-entrada-saida-editar/registro-entrada-saida-editar.component';
import { TicketEditarComponent } from './components/editar/ticket-editar/ticket-editar.component';

/* Delete */
import { ExcluirComponent } from './components/excluir/excluir.component';
import { ClientesExcluirComponent } from './components/excluir/clientes-excluir/clientes-excluir.component';
import { VagasExcluirComponent } from './components/excluir/vagas-excluir/vagas-excluir.component';
import { FuncionariosExcluirComponent } from './components/excluir/funcionarios-excluir/funcionarios-excluir.component';
import { TarifariosExcluirComponent } from './components/excluir/tarifarios-excluir/tarifarios-excluir.component';
import { ReservasExcluirComponent } from './components/excluir/reservas-excluir/reservas-excluir.component';
import { CartoesExcluirComponent } from './components/excluir/cartoes-excluir/cartoes-excluir.component';
import { ServicosExcluirComponent } from './components/excluir/servicos-excluir/servicos-excluir.component';
import { ContasExcluirComponent } from './components/excluir/contas-excluir/contas-excluir.component';
import { RegistroEntradaSaidaExcluirComponent } from './components/excluir/registro-entrada-saida-excluir/registro-entrada-saida-excluir.component';
import { PagamentoExcluirComponent } from './components/excluir/pagamento-excluir/pagamento-excluir.component';
import { TicketExcluirComponent } from './components/excluir/ticket-excluir/ticket-excluir.component';

/* Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { OcuparVagaComponent } from './components/dialog/ocupar-vaga/ocupar-vaga.component';
import { PagamentosFormComponent } from './components/formularios/pagamentos-form/pagamentos-form.component';
import { PagamentosEditarComponent } from './components/editar/pagamentos-editar/pagamentos-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    CarrosComponent,
    HomeComponent,
    CadastroComponent,
    ClientesComponent,
    CartaoAcessosComponent,
    ContasComponent,
    FuncionariosComponent,
    PagamentosComponent,
    RegistroEntradaSaidasComponent,
    ReservasComponent,
    ServicoExtrasComponent,
    TarifariosComponent,
    TicketsComponent,
    VagasComponent,
    CarrosFormComponent,
    ExcluirComponent,
    ClientesFormComponent,
    CarrosEditarComponent,
    ClientesEditarComponent,
    ClientesExcluirComponent,
    FuncionariosExcluirComponent,
    FuncionariosFormComponent,
    VagasFormComponent,
    VagasExcluirComponent,
    OcuparVagaComponent,
    TarifariosExcluirComponent,
    TarifariosFormComponent,
    TarifariosEditarComponent,
    FuncionariosEditarComponent,
    VagasEditarComponent,
    ReservasExcluirComponent,
    ReservasEditarComponent,
    ReservasFormComponent,
    CartoesFormComponent,
    CartoesEditarComponent,
    CartoesExcluirComponent,
    ServicosFormComponent,
    ServicosEditarComponent,
    ServicosExcluirComponent,
    ContasFormComponent,
    ContasEditarComponent,
    ContasExcluirComponent,
    RegistroEntradaSaidaFormComponent,
    RegistroEntradaSaidaEditarComponent,
    RegistroEntradaSaidaExcluirComponent,
    PagamentoExcluirComponent,
    TicketExcluirComponent,
    TicketFormComponent,
    TicketEditarComponent,
    PagamentosFormComponent,
    PagamentosEditarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [
    HttpClientModule,
    CarrosService,
    ClientesService,
    CartaoAcessosService,
    ContasService,
    FuncionarioService,
    RegistroEntradaSaidasService,
    TicketsService,
    ReservasService,
    VagasService,
    ServicoExtrasService,
    TarifariosService,
    PagamentosService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

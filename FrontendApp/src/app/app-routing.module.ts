import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { CarrosComponent } from './components/carros/carros.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CartaoAcessosComponent } from './components/cartao-acessos/cartao-acessos.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { PagamentosComponent } from './components/pagamentos/pagamentos.component';
import { ContasComponent } from './components/contas/contas.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { ServicoExtrasComponent } from './components/servico-extras/servico-extras.component';
import { TarifariosComponent } from './components/tarifarios/tarifarios.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { VagasComponent } from './components/vagas/vagas.component';
import { RegistroEntradaSaidasComponent } from './components/registro-entrada-saidas/registro-entrada-saidas.component';

/* Forms Components */ 
import { CarrosFormComponent } from './components/formularios/carros-form/carros-form.component';
import { ClientesFormComponent } from './components/formularios/clientes-form/clientes-form.component';
import { CarrosEditarComponent } from './components/editar/carros-editar/carros-editar.component';
import { ClientesEditarComponent } from './components/editar/clientes-editar/clientes-editar.component';
import { FuncionariosFormComponent } from './components/formularios/funcionarios-form/funcionarios-form.component';
import { VagasFormComponent } from './components/formularios/vagas-form/vagas-form.component';
import { TarifariosFormComponent } from './components/formularios/tarifarios-form/tarifarios-form.component';
import { TarifariosEditarComponent } from './components/editar/tarifarios-editar/tarifarios-editar.component';
import { FuncionariosEditarComponent } from './components/editar/funcionarios-editar/funcionarios-editar.component';
import { VagasEditarComponent } from './components/editar/vagas-editar/vagas-editar.component';
import { ReservasFormComponent } from './components/formularios/reservas-form/reservas-form.component';
import { ReservasEditarComponent } from './components/editar/reservas-editar/reservas-editar.component';
import { CartoesFormComponent } from './components/formularios/cartoes-form/cartoes-form.component';
import { CartoesEditarComponent } from './components/editar/cartoes-editar/cartoes-editar.component';
import { ServicosFormComponent } from './components/formularios/servicos-form/servicos-form.component';
import { ServicosEditarComponent } from './components/editar/servicos-editar/servicos-editar.component';
import { ContasFormComponent } from './components/formularios/contas-form/contas-form.component';
import { ContasEditarComponent } from './components/editar/contas-editar/contas-editar.component';
import { RegistroEntradaSaidaFormComponent } from './components/formularios/registro-entrada-saida-form/registro-entrada-saida-form.component';
import { RegistroEntradaSaidaEditarComponent } from './components/editar/registro-entrada-saida-editar/registro-entrada-saida-editar.component';
import { PagamentosFormComponent } from './components/formularios/pagamentos-form/pagamentos-form.component';
import { PagamentosEditarComponent } from './components/editar/pagamentos-editar/pagamentos-editar.component';
import { TicketFormComponent } from './components/formularios/ticket-form/ticket-form.component';
import { TicketEditarComponent } from './components/editar/ticket-editar/ticket-editar.component';

const routes: Routes = [
  {path: 'carros', component:CarrosComponent },
  {path: 'cadastrar-veiculo', component:CarrosFormComponent },
  {path: 'editar-veiculo/:placa', component:CarrosEditarComponent},

  {path: 'clientes', component: ClientesComponent},
  {path: 'cadastrar-cliente', component:ClientesFormComponent},
  {path: 'editar-cliente/:cpf', component:ClientesEditarComponent},

  {path: 'cartao-acesso', component:CartaoAcessosComponent},
  {path: 'cadastrar-cartao', component:CartoesFormComponent},
  {path: 'editar-cartao/:idCartao', component:CartoesEditarComponent},

  {path: 'funcionarios', component:FuncionariosComponent},
  {path: 'cadastrar-funcionario', component:FuncionariosFormComponent},
  {path: 'editar-funcionario/:matricula', component:FuncionariosEditarComponent},

  {path: 'contas', component:ContasComponent},
  {path: 'cadastrar-conta', component:ContasFormComponent},
  {path: 'editar-conta/:contaId', component:ContasEditarComponent},

  {path: 'reservas', component:ReservasComponent},
  {path: 'cadastrar-reserva', component:ReservasFormComponent},
  {path: 'editar-reserva/:reservaId', component:ReservasEditarComponent},

  {path: 'servico-extra', component:ServicoExtrasComponent},
  {path: 'cadastrar-servico', component:ServicosFormComponent},
  {path: 'editar-servico/:servicoId', component:ServicosEditarComponent},

  {path: 'tarifarios', component:TarifariosComponent},
  {path: 'cadastrar-tarifario', component:TarifariosFormComponent},
  {path: 'editar-tarifario/:idTarifario', component:TarifariosEditarComponent},

  {path: 'vagas', component:VagasComponent},
  {path: 'cadastrar-vaga', component:VagasFormComponent},
  {path: 'editar-vaga/:vagaId', component:VagasEditarComponent},

  {path: 'pagamentos', component:PagamentosComponent},
  {path: 'cadastrar-pagamento', component:PagamentosFormComponent},
  {path: 'editar-pagamento/:idPagamento', component:PagamentosEditarComponent},

  {path: 'registros', component:RegistroEntradaSaidasComponent},
  {path: 'cadastrar-registro', component:RegistroEntradaSaidaFormComponent},
  {path: 'editar-registro/:registroId', component:RegistroEntradaSaidaEditarComponent},

  {path: 'tickets', component:TicketsComponent},
  {path: 'cadastrar-ticket', component:TicketFormComponent},
  {path: 'editar-ticket/:idTicket', component:TicketEditarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

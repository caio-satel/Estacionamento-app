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

const routes: Routes = [
  {path: 'carros', component:CarrosComponent },
  {path: 'cadastrar-veiculo', component:CarrosFormComponent },
  {path: 'editar-veiculo/:placa', component:CarrosEditarComponent},

  {path: 'clientes', component: ClientesComponent},
  {path: 'cadastrar-cliente', component:ClientesFormComponent},
  {path: 'editar-cliente/:cpf', component:ClientesEditarComponent},

  {path: 'cartao-acesso', component:CartaoAcessosComponent},

  {path: 'funcionarios', component:FuncionariosComponent},
  {path: 'cadastrar-funcionario', component:FuncionariosFormComponent},

  {path: 'contas', component:ContasComponent},
  {path: 'pagamentos', component:PagamentosComponent},
  {path: 'registros', component:RegistroEntradaSaidasComponent},
  {path: 'reservas', component:ReservasComponent},
  {path: 'servico-extra', component:ServicoExtrasComponent},
  {path: 'tarifarios', component:TarifariosComponent},
  {path: 'tickets', component:TicketsComponent},

  {path: 'vagas', component:VagasComponent},
  {path: 'cadastrar-vaga', component:VagasFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

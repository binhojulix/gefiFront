import { Role } from './models/role';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControleComponent } from './controle/controle.component';
import { EquipamentoComponent } from './equipamento/equipamento.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AssociacaoComponent } from './associacao/associacao.component';
import { RevisaoComponent } from './revisao/revisao.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AuthGuard} from './helpers/auth.guard'


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard],  data: { roles: [Role.Admin]} },
  { path: 'controle', component: ControleComponent, canActivate: [AuthGuard] },
  { path: 'equipamento', component: EquipamentoComponent, canActivate: [AuthGuard], data: { roles: [Role.Gestor, Role.Admin]}},
  { path: 'associacao', component: AssociacaoComponent, canActivate: [AuthGuard], data: { roles: [Role.Gestor, Role.Admin]}},
  { path: 'revisao', component: RevisaoComponent, canActivate: [AuthGuard] },
  { path: '**', component: PaginaNaoEncontradaComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { AutenticadorService } from './service/autenticador.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { EquipamentoComponent } from './equipamento/equipamento.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ControleComponent } from './controle/controle.component';
import { AppPrimefacesModule } from './app-primefaces.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipamentoService } from './service/equipamento.service';
import { UserService } from './service/user.service';
import { ControleService } from './service/controle.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from '../app/helpers/error.interceptor';
import { JwtInterceptor } from '../app/helpers/jwt.interceptor';
import {appInitializer} from '../app/helpers/app.initializer';
import { FalhaEquipamentoComponent } from './falha-equipamento/falha-equipamento.component';
import { TransferirEquipamentoComponent } from './transferir-equipamento/transferir-equipamento.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaNaoEncontradaComponent,
    EquipamentoComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    ControleComponent,
    FalhaEquipamentoComponent,
    TransferirEquipamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppPrimefacesModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
     EquipamentoService,ControleService,UserService,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AutenticadorService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

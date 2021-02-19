import { Component, OnInit, Input } from '@angular/core';
import { Controle } from '../models/controle';
import { Usuario } from '../models/usuario';
import {Equipamento} from '../models/equipamento';
import { Solicitacao } from '../models/solicitacao';
import {Pendencia } from '../models/pendencia';
import { ControleService } from '../service/controle.service';
import { SolicitacaoService } from '../service/solicitacao.service';
import { PendenciaService } from '../service/pendencia.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { UserService } from '../service/user.service';
import { EquipamentoService } from '../service/equipamento.service';
import { AutenticadorService } from '../service/autenticador.service';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit {

 
  controleDialogo: boolean;
  pendenciaDialogo:boolean;
  visualizarDialogo:boolean;

  usuarios: Usuario[];
  equipamentos:Equipamento[];
  controles: Controle[];
  controlesSelecionados: Controle[];

  pendencia:Pendencia;
  controle: Controle;
  solicitacao:Solicitacao;
  currentUser: Usuario;
  submitted: boolean;
  label:string;
  status_pendencia:string;
  coletivo:boolean;
 

 

  constructor(
    private solicitacaoService: SolicitacaoService,
    private controleService: ControleService,
    private messageService: MessageService, 
    private pendenciaService:PendenciaService,
    private usuarioService: UserService,
    private equipamentoService:EquipamentoService,
    private authenticationService: AutenticadorService,
    private confirmationService: ConfirmationService) {
      this.authenticationService
        .currentUser.subscribe(x => this.currentUser = x);
     }

  
  ngOnInit() {
      this.coletivo=true;
      this.label ="Controle de ferramentas coletiva";
      this.listarControles(this.coletivo);
    

  }

  selecionarIndividuais():void{
    this.coletivo=false;
    this.controles = [];
    this.label ="Controle de ferramentas individuais";
    this.listarControles(this.coletivo);
  }

  selecionarColetivo():void{
    this.coletivo=true;
    this.controles = [];
    this.label ="Controle de ferramentas coletiva";
    this.listarControles(this.coletivo);
  }


  listarUsuarios():void{
    this.usuarioService.getUsuarios()
        .subscribe(
            data => {
                this.usuarios = data;
            },
            error => {
                console.log(error);
            });
  }


  listarEquipamentos():void{
    this.equipamentoService.getEquipamentosNaoAssociados()
        .subscribe(
            data => {
                this.equipamentos = data;
            },
            error => {
                console.log(error);
            });
  }


  listarControles(coletivo:boolean): void {
    this.controleService.getControles(coletivo)
        .subscribe(
        data => {
            this.controles = data;
        },
        error => {
            console.log(error);
        });
    }
  //associa equipamento ao usuario ou a área
  novoControle(){
    this.controle = {};
    this.submitted = false;
    this.controleDialogo = true;
    this.listarUsuarios();
    this.listarEquipamentos();
  }

  tratarPendencia(controle:Controle){
    this.controle = controle;
    this.pendencia = {};
    this.submitted = false;
    this.pendenciaDialogo = true;
    if(controle.pendente){
      this.status_pendencia ="Finalizar Pendência";
    }else{
      this.status_pendencia ="Nova Pendência";
    }
  }

  visualizar(controle:Controle){
    this.visualizarDialogo=true;

     var a:Pendencia = {
      id:1,
      solucao_pendencia:"teste",
      data_pendencia:new Date(),
      data_solucao:new Date(),
      motivo_pendencia:"testanto"
    }
    this.pendencia = a;

    var b:Solicitacao = {
      id:1,
      data_devolucao:new Date(),
      data_solicitacao:new Date(),
      usuario:this.currentUser
    }
    this.solicitacao = b;
   

  }


  fecharVisualizarDialogo(){
    this.visualizarDialogo=false;
  }

  fecharPendenciaDialogo(){
    this.pendenciaDialogo=false;
    this.pendencia={};
  }

  fecharControleDialogo(){
    this.controleDialogo=false;
    this.controle={};
  }




  adicionaControle(){

  }  

  solicitaEquipamento(controle:Controle){
    const id = controle.id;

    this.confirmationService.confirm({
        message: `Solicitar o equipamento ${controle.equipamento.descricao} ?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:'Sim',
        rejectLabel:'Não',

        accept: () => {
          controle.status="INDISPONIVEL";
          controle.disponivel=false;

            this.controleService.updateControle(controle)
            .subscribe(
                response => {
                    this.controles[this.findIndexById(controle.id)] = controle
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Controle selecionado', life: 3000});
                },
                error => {
                console.log(error);
                });

           
        }
    });
  }

  devolveEquipamento(controle:Controle){
    const id = controle.id;

    this.confirmationService.confirm({
        message: `Devolver o equipamento ${controle.equipamento.descricao} ?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:'Sim',
        rejectLabel:'Não',

        accept: () => {
          
            controle.status="DISPONIVEL";
            controle.disponivel=true;
            this.controleService.updateControle(controle)
            .subscribe(
                response => {
                    console.log(response);
                    this.controles[this.findIndexById(controle.id)] = controle
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Controle selecionado', life: 3000});
                },
                error => {
                console.log(error);
                });

           
        }
    });
  }


  adicionaPendencia(controle:Controle){

  }

  atualizaPendencia(controle:Controle){

  }

  findIndexById(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.equipamentos.length; i++) {
        if (this.equipamentos[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}



}

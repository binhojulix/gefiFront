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
    const role = this.currentUser.role;
    const usuario_id = this.currentUser.id;

    this.controleService.getControles(coletivo, role, usuario_id, this.currentUser.area.id)
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

    if(this.controle.pendente){
      this.status_pendencia ="Finalizar Pendência";
      this.pendenciaService.getPendenciaPorControleId(this.controle.id)
      .subscribe(
        data => {
            this.pendencia = data;
            console.log(this.pendencia)
        },
        error => {
            throw error;
        });
    }else{
      this.status_pendencia ="Nova Pendência";
    }
}



adicionaPendencia(){

  const verificar = this.controle.pendente;
  if(!verificar){
    this.pendencia.controle_id = this.controle.id;
    this.pendenciaService.addPendencia(this.pendencia).subscribe(
      response=>{
       
      },error=>{
        throw error;
      }
    )
  

  }else{
    this.pendenciaService.updatePendencia(this.pendencia).subscribe(
      response=>{
      
      },error=>{
        throw error;
      }
    )
   
  }
  this.controles[this.findIndexById(this.controle.id)].pendente = !verificar;
  if(verificar){
    this.controles[this.findIndexById(this.controle.id)].status="SEM PENDENCIA";
  }else{
    this.controles[this.findIndexById(this.controle.id)].status="COM PENDENCIA";
  }
  console.log(this.controles[this.findIndexById(this.controle.id)])
  this.pendencia={};
  this.controle={};
  this.pendenciaDialogo=false;

}


  visualizar(controle:Controle){
    this.visualizarDialogo=true;
    this.controle=controle;
    if(this.controle.coletivo){
      this.solicitacaoService.getSolicitacaoPorControleId(this.controle.id)
      .subscribe(
        data => {
            this.solicitacao = data;
        },
        error => {
            console.log(error);
        });
    }else{
      this.pendenciaService.getPendenciaPorControleId(this.controle.id)
      .subscribe(
        data => {
            this.pendencia = data;
        },
        error => {
            console.log(error);
        });
    }
   
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
    console.log(`${this.controle}`)
    this.controleService.addControle(this.controle)
      .subscribe(
        response=>{
          console.log("controle adicionado")
        },
        error=>{
          throw error;
        }
      );
      this.controleDialogo=false;
  }  

  solicitaEquipamento(controle:Controle){
    this.controle = controle;
    this.confirmationService.confirm({
        message: `Solicitar o equipamento ${this.controle.equipamento.descricao} ?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:'Sim',
        rejectLabel:'Não',

        accept: () => {
            this.solicitacao ={
              controle : this.controle,
              usuario: this.currentUser
            }
            this.solicitacaoService.addSolicitacao(this.solicitacao)
            .subscribe(
                response => {
                    //this.controles[this.findIndexById(controle.id)] = this.controle
                    this.controles[this.findIndexById(controle.id)].disponivel = false;
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Equipamento solicitado', life: 3000});
                },
                error => {
                  throw error;
                });
                this.controle={};
                this.solicitacao={};
        }
    });

      this.controles[this.findIndexById(this.controle.id)].status="INDISPONIVEL";
   
  }


  devolveEquipamento(controle:Controle){
    this.controle = controle;

    this.solicitacaoService.getSolicitacaoPorControleId(this.controle.id)
    .subscribe(
      data => {
          this.solicitacao = data;
          console.log(this.solicitacao)
      },
      error => {
          console.log(error);
      });

    this.confirmationService.confirm({

        message: `Devolver o equipamento ${this.controle.equipamento.descricao} ? `,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:'Sim',
        rejectLabel:'Não',

        accept: () => {
            this.solicitacaoService.updateSolicitacao(this.solicitacao).subscribe(
              response=>{
                //  this.controles[this.findIndexById(controle.id)] = this.controle;
                  this.controles[this.findIndexById(controle.id)].disponivel = true;
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Equipamento devolvido', life: 3000});
                },
                error => {
                  throw error;
                });
                this.controle={};
                this.solicitacao={};
        }

    });
    this.controles[this.findIndexById(this.controle.id)].status="DISPONIVEL";
  }

 

  findIndexById(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.controles.length; i++) {
        if (this.controles[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}



}

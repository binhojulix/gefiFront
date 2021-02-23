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

  usuarios: Usuario[];
  equipamentos:Equipamento[];
  controles: Controle[];
  controlesSelecionados: Controle[];
  controle: Controle;
  solicitacao:Solicitacao;
  pendencia:Pendencia;
  submitted: boolean;
  currentUser: Usuario;
  visualizarDialogo:boolean;
  controleDialogo:boolean;
  pendenciaDialogo:boolean;
 
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
      this.listarControles();
    
  }

  //associa equipamento ao usuario ou a área
  abrirNovoControle(){
    this.controle = {};
    this.submitted = false;
    this.controleDialogo = true;
}

  abrirNovaPendencia(){
    this.pendencia={};
    this.submitted=false;
    this.pendenciaDialogo=true;
  }


  listarUsuarios(){
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


  listarControles(): void {
    this.controleService.getControles()
        .subscribe(
        data => {
            this.controles = data;
        },
        error => {
            console.log(error);
        });
    }



adicionaControle(){
  this.controleService.addControle(this.controle)
  .subscribe(
      response => {
          this.controles = this.controles.filter(val =>  val.id
               !== this.controle.id);
          this.controle = {};
      },
      error => {
        console.log(error);
      });
}

escondeControle(){
  this.controleDialogo = false;
}
escondePendencia(){
  this.pendenciaDialogo = false;
}

escondeVisualizacao(){
  this.visualizarDialogo =false;
}


registraEResolvePendencia(controle:Controle){



  const disponivel = controle.disponivel;

        controle.disponivel = !disponivel;
        this.controleService.updateControle(controle)
        .subscribe(
            response=>{
              if(disponivel){
         
                this.pendencia.data_pendencia = new Date();
                this.pendencia.controle=controle;
                this.pendenciaService.addPendencia(this.pendencia)
                .subscribe(
                    response => {
                      this.pendencia= {};
                    },
                    error => {
                      console.log(error);
                    })
              }else{
                this.pendencia.data_pendencia = new Date();
                this.pendencia.controle= this.controle;
                this.pendenciaService.updatePendencia(this.pendencia)
                .subscribe(
                    response => {
                      this.pendencia = {}
                    },
                    error => {
                      console.log(error);
                    })
              }
              this.controles = this.controles.filter(val =>  val.id
                !== controle.id);
                this.controle={};
            },
            error=>{
              console.log(error)
            }
        );
      
      }
  
    



visualizar(controle:Controle){


  this.controle = {...controle};

  this.visualizarDialogo=true;

  this.solicitacaoService.getSolicitacoesByControle(this.controle.id)
    .subscribe(
    data => {
        this.controle.solicitacoes = data;
    },
    error => {
        console.log(error);
    });
  

  this.pendenciaService.getPendenciasByControle(controle.id)
  .subscribe(
    data => {
        this.controle.pendencias = data;
    },
    error => {
        console.log(error);
    });

}








solicitaEDevolveEquipamento(controle:Controle){
  const disponivel = controle.disponivel;

  const mensagem = `Solicitar o Equipamento ${controle.equipamento.descricao} ?`;
  if(disponivel){
    `Devolver o Equipamento ${controle.equipamento.descricao} ?`;
  }

  this.confirmationService.confirm({
      message: mensagem,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-check',
      acceptLabel:'Sim',
      rejectLabel:'Não',

      accept: () => {

        controle.disponivel = !disponivel;
        this.controleService.updateControle(controle)
        .subscribe(
            response=>{
              if(disponivel){
                this.solicitacao.usuario = this.currentUser;
                this.solicitacao.data_solicitacao = new Date();
                this.solicitacao.controle=controle;
                this.solicitacaoService.addSolicitacao(this.solicitacao)
                .subscribe(
                    response => {
                      this.solicitacao = {};
                    },
                    error => {
                      console.log(error);
                    })
              }else{
                this.solicitacao.data_devolucao = new Date();
                this.solicitacaoService.updateSolicitacao(this.solicitacao)
                .subscribe(
                    response => {
                      this.solicitacao = {}
                    },
                    error => {
                      console.log(error);
                    })
              }
              this.controles = this.controles.filter(val =>  val.id
                !== controle.id);
                this.controle={};
            },
            error=>{
              console.log(error)
            }
        );
      
      }
  });
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

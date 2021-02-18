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
  associacaoDialogo:boolean;
  defeitoControleDialogo:boolean;
  solicitacaoDialogo:boolean;
  pendenciaDialogo:boolean;
  usuarios: Usuario[];
  equipamentos:Equipamento[];
  controles: Controle[];
  controlesSelecionados: Controle[];
  controle: Controle;
  solicitacao:Solicitacao;
  submitted: boolean;
  currentUser: Usuario;
 

 

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
      this.coletivo = false;
  }


  //associa equipamento ao usuario ou a área
  novoControle(){
    this.controle = {};
    this.submitted = false;
    this.associacaoDialogo = true;
    this.listarUsuarios();
    this.listarEquipamentos();
  }



  esconderDialogoControle():void{
    this.revisaoDialogo = false;
    this.submitted = false;
  }

  esconderDialogoAssociacao():void{
    this.associacaoDialogo=false;
    this.submitted=false;
  }

  esconderDialogoValidacao():void{
    this.validacaoDialogo=false;
    this.submitted=false;
  }

  esconderVisualizaoControle():void{
    this.visualizarControleDiaolgo=false;
    this.submitted=false;
  }
  esconderVizualizacaoSolicitacao():void{
    this.visualizarSolicitacaoDialogo=false;
    this.submitted=false;
  }


  mostrarSolicitacao():void{
    this.coletivo=true;
  }

  mostrarControles():void{
    this.coletivo=false;
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






adicionaControle(controle:Controle){
  this.controleService.addControle(this.controle)
  .subscribe(
      response => {
          this.controles = this.controles.filter(val =>  val.id
               !== controle.id);
          this.controle = {};
      },
      error => {
        console.log(error);
      });
}

registraEResolvePendencia(controle:Controle){
  const disponivel = controle.disponivel;

  const mensagem = `Solicitar o Equipamento ${controle.equipamento.descricao} ?`;
  if(disponivel){
    `Devolver o Equipamento ${controle.equipamento.descricao} ?`;
  }


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
  
}



visualizar(controle:Controle){
  this.controle = {...controle};
  this.solicitacaoService.getSolicitacoesByControle(controle.id)
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
    for (let i = 0; i < this.equipamentos.length; i++) {
        if (this.equipamentos[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}


}

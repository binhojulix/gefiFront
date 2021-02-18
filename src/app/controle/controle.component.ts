import { Component, OnInit, Input } from '@angular/core';
import { Controle } from '../models/controle';
import { ControleService } from '../service/controle.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Usuario } from '../models/usuario';
import {Equipamento} from '../models/equipamento';
import { UserService } from '../service/user.service';
import { EquipamentoService } from '../service/equipamento.service';
import { AutenticadorService } from '../service/autenticador.service';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit {

  revisaoDialogo: boolean;
  associacaoDialogo:boolean;
  visualizarDialogo:boolean;
  usuarios: Usuario[];
  equipamentos:Equipamento[];
  labelEquipamento:String;
  controles: Controle[];
  controle: Controle;
  controlesSelecionados: Controle[];
  submitted: boolean;
  currentUser: Usuario;
  coletivo:boolean;

 

  constructor(private controleService: ControleService,
    private messageService: MessageService, 
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


  novaAssocicaoDeEquipamento(){
    this.controle = {};
    this.submitted = false;
    this.associacaoDialogo = true;
    this.listarUsuarios();
    this.listarEquipamentos();
  }



  esconderDialogoRevisao():void{
    this.revisaoDialogo = false;
    this.submitted = false;
  }

  esconderDialogoAssociacao():void{
    this.associacaoDialogo=false;
    this.submitted=false;
  }

  esconderVisualizaoRevisao():void{
    this.visualizarDialogo=false;
    this.submitted=false;
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


  visualizar(controle:Controle):void{

  }


  mostrarColetivos():void{
    this.coletivo=true;
  }

  mostrarIndividuais(){
    this.coletivo=false;
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





  associaEquipamento(){
    this.submitted = true;

      this.controleService.addControle(this.controle)
      .subscribe(
          response => {
          console.log(response);
          this.submitted = true;
          },
          error => {
          console.log(error);
          });
        this.controles.push(this.controle);
        this.messageService.add({severity:'success', summary: 'Successful', 
        detail: 'Controle feita com sucesso', life: 3000});
  
        this.usuarios = [...this.usuarios];
        this.revisaoDialogo = false;
        this.controle = {};
  }



registraRevisao(controle:Controle){
  this.controle = {...controle};
  this.revisaoDialogo = true;
}  

validaRevisao(controle:Controle){
  this.controle = {...controle};
  this.revisaoDialogo = true;
}

visualizarControle(controle:Controle){
  this.controle = {...controle};
  this.visualizarDialogo = true;
}


devolveEquipamento(controle: Controle){
  const id = controle.id;

  this.confirmationService.confirm({
      message: 'Devolver Equipamento o equipamento ' + controle.equipamento.descricao + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Sim',
      rejectLabel:'Não',

      accept: () => {
        

          this.controleService.updateControle(controle)
          .subscribe(
              response => {
                  console.log(response);
                  this.controles = this.controles.filter(val =>  val.id
                       !== controle.id);
                  this.controle = {};
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Equipamento solicitado', life: 3000});
              },
              error => {
              console.log(error);
              });

         
      }
  });
}


solicitaEquipamento(controle: Controle){
  const id = controle.id;

  this.confirmationService.confirm({
      message: 'Solicitar o equipamento ' + controle.equipamento.descricao + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Sim',
      rejectLabel:'Não',

      accept: () => {
        

          this.controleService.updateControle(controle)
          .subscribe(
              response => {
                  console.log(response);
                  this.controles = this.controles.filter(val =>  val.id
                       !== controle.id);
                  this.controle = {};
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Equipamento solicitado', life: 3000});
              },
              error => {
              console.log(error);
              });

         
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

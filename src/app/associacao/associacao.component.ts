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
  selector: 'app-associacao',
  templateUrl: './associacao.component.html',
  styleUrls: ['./associacao.component.css']
})
export class AssociacaoComponent implements OnInit {

  controleDialogo: boolean;
  usuarios: Usuario[];
  equipamentos:Equipamento[];
  labelEquipamento:String;
  controles: Controle[];
  controle: Controle;
  controlesSelecionados: Controle[];
  submitted: boolean;
  currentUser: Usuario;

 

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


  abrirNovo(){
        
    this.controle = {};
    this.submitted = false;
    this.controleDialogo = true;
    this.listarUsuarios();
    this.listarEquipamentos();

  }

  esconderDialogo(){
    this.controleDialogo = false;
    this.submitted = false;

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

  
  listarEquipamentos(){
        
    this.equipamentoService.getEquipamentosNaoAssociados()
        .subscribe(
            data => {
                this.equipamentos = data;
            },
            error => {
                console.log(error);
            });
  }



  salvarControle(){
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
        this.controleDialogo = false;
        this.controle = {};
  }

  editaEquipamento(controle: Controle) {
    this.controle = {...controle};
    this.controleDialogo = true;
    
}


devolveControle(controle: Controle){
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

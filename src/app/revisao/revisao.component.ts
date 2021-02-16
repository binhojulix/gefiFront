import { Component, OnInit, Input } from '@angular/core';
import { Revisao } from '../models/revisao';
import { RevisaoService } from '../service/revisao.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Usuario } from '../models/usuario';
import {Equipamento} from '../models/equipamento';
import { UserService } from '../service/user.service';
import { EquipamentoService } from '../service/equipamento.service';
import { AutenticadorService } from '../service/autenticador.service';


@Component({
  selector: 'app-revisao',
  templateUrl: './revisao.component.html',
  styleUrls: ['./revisao.component.css']
})
export class RevisaoComponent implements OnInit {
  revisaoDialogo: boolean;
  usuarios: Usuario[];
  equipamentos:Equipamento[];
  labelEquipamento:String;
  revisoes: Revisao[];
  revisao: Revisao;
  revisoesSelecionadas: Revisao[];
  submitted: boolean;
  currentUser: Usuario;

 

  constructor(private revisaoService: RevisaoService,
    private messageService: MessageService, 
    private usuarioService: UserService,
    private equipamentoService:EquipamentoService,
    private authenticationService: AutenticadorService,
    private confirmationService: ConfirmationService) {
      this.authenticationService
        .currentUser.subscribe(x => this.currentUser = x);
     }

  
  ngOnInit() {
      this.listarRevisaos();
  }

  listarRevisaos(): void {
    this.revisaoService.getRevisoes()
        .subscribe(
        data => {
            this.revisoes = data;
        },
        error => {
            console.log(error);
        });
    }


  abrirNovo(){
        
    this.revisao = {};
    this.submitted = false;
    this.revisaoDialogo = true;
    this.listarUsuarios();
    this.listarEquipamentos();

  }

  esconderDialogo(){
    this.revisaoDialogo = false;
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



  salvarRevisao(){
    this.submitted = true;

      this.revisaoService.addRevisao(this.revisao)
      .subscribe(
          response => {
          console.log(response);
          this.submitted = true;
          },
          error => {
          console.log(error);
          });
        this.revisoes.push(this.revisao);
        this.messageService.add({severity:'success', summary: 'Successful', 
        detail: 'Revisao feita com sucesso', life: 3000});
  
        this.usuarios = [...this.usuarios];
        this.revisaoDialogo = false;
        this.revisao = {};
  }

  editaEquipamento(Revisao: Revisao) {
    this.revisao = {...Revisao};
    this.revisaoDialogo = true;
    
}


devolveRevisao(revisao: Revisao){
  const id = revisao.id;

  this.confirmationService.confirm({
      message: 'Solicitar o equipamento ' + revisao.equipamento.descricao + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Sim',
      rejectLabel:'Não',

      accept: () => {
        

          this.revisaoService.updateRevisao(revisao.id, revisao)
          .subscribe(
              response => {
                  console.log(response);
                  this.revisoes = this.revisoes.filter(val =>  val.id
                       !== revisao.id);
                  this.revisao = {};
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

import { Component, OnInit, Input } from '@angular/core';
import { Associacao } from '../models/associacao';
import { AssociacaoService } from '../service/associacao.service';
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


  AssociacaoDialogo: boolean;
  usuarios: Usuario[];
  equipamentos:Equipamento[];
  labelEquipamento:String;
  associacoes: Associacao[];
  associacao: Associacao;
  associacoesSelecionadas: Associacao[];
  submitted: boolean;
 

  constructor(private associacaoService: AssociacaoService,
    private messageService: MessageService, 
    private usuarioService: UserService,
    private equipamentoService:EquipamentoService,
    private confirmationService: ConfirmationService) {
  
     }

    

  ngOnInit() {
      this.listarAssociacaos();
  }

  listarAssociacaos(): void {
    this.associacaoService.getAssociacoes()
        .subscribe(
        data => {
            this.associacoes = data;
            console.log(data);
        },
        error => {
            console.log(error);
        });
    }


  abrirNovo(){
        
    this.associacao = {};
    this.submitted = false;
    this.AssociacaoDialogo = true;
    this.listarUsuarios();
    this.listarEquipamentos();

  }

  esconderDialogo(){
    this.AssociacaoDialogo = false;
    this.submitted = false;
  }

  listarUsuarios(){
        
    this.usuarioService.getUsuarios()
        .subscribe(
            data => {
                this.usuarios = data;
                console.log(data);
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
                console.log(data);
            },
            error => {
                console.log(error);
            });
  }



  salvarAssociacao(){
    this.submitted = true;
        

      this.associacaoService.addAssociacao(this.associacao)
      .subscribe(
          response => {
          console.log(response);
          this.submitted = true;
          },
          error => {
          console.log(error);
          });
        this.associacoes.push(this.associacao);
        this.messageService.add({severity:'success', summary: 'Successful', 
        detail: 'Associacao feita com sucesso', life: 3000});
  
        this.usuarios = [...this.usuarios];
        this.AssociacaoDialogo = false;
        this.associacao = {};
  }


  editaEquipamento(associacao:Associacao) {
    this.associacao = {...associacao};
    this.AssociacaoDialogo = true;
    
}


devolveAssociacao(associacao:Associacao){
  const id = associacao.id;

  this.confirmationService.confirm({
      message: 'Solicitar o equipamento ' + associacao.equipamento.descricao + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Sim',
      rejectLabel:'Não',

      accept: () => {
        

          this.associacaoService.updateAssociacao(associacao)
          .subscribe(
              response => {
                  console.log(response);
                  this.associacoes = this.Associacoes.filter(val =>  val.id
                       !== associacao.id);
                  this.associacao = {};
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

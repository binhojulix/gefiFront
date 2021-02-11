import { Component, OnInit, Input } from '@angular/core';
import { Controle } from '../models/controle';
import { ControleService } from '../service/controle.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Usuario } from '../models/usuario';
import {Equipamento} from '../models/equipamento';
import { UserService } from '../service/user.service';
import { EquipamentoService } from '../service/equipamento.service';

@Component({
  selector: 'app-associacao',
  templateUrl: './associacao.component.html',
  styleUrls: ['./associacao.component.css']
})
export class AssociacaoComponent implements OnInit {
    controleDialogoAssociarUsuario: boolean;



    usuarios: Usuario[];
    equipamentos:Equipamento[];
  
    labelEquipamento:String;
  
  
  
    controles: Controle[];
  
    controle: Controle;
  
    controlesSelecionados: Controle[];
  
    submitted: boolean;
    selectedCountry: string;
  
    countries: any[];
  
    constructor(private controleService: ControleService,
      private messageService: MessageService, 
      private usuarioService: UserService,
      private equipamentoService:EquipamentoService,
      private confirmationService: ConfirmationService) {
    
       }
  
      
  
    ngOnInit() {
        this.listarControles();
        console.log("total de controles")
        console.log(this.controles);
    }
  
    listarControles(): void {
      this.controleService.getControles()
          .subscribe(
          data => {
              this.controles = data;
              console.log(data);
          },
          error => {
              console.log(error);
          });
      }
  
  
    abrirNovo(){
          
      this.controle = {};
      this.submitted = false;
      this.controleDialogoAssociarUsuario = true;
      this.listarUsuarios();
      this.listarEquipamentos();
  
    }
  
    esconderDialogo(){
  
      this.controleDialogoAssociarUsuario = false;
  
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
          detail: 'Associacao feita com sucesso', life: 3000});
    
          this.usuarios = [...this.usuarios];
          this.controleDialogoAssociarUsuario = false;
          this.controle = {};
    }
  
  
  
  }
  
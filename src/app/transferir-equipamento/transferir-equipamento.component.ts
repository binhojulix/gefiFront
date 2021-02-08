import { Departamento } from './../models/departamento';
import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UserService } from '../service/user.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';

@Component({
  selector: 'app-transferir-equipamento',
  templateUrl: './transferir-equipamento.component.html',
  styleUrls: ['./transferir-equipamento.component.css']
})
export class TransferirEquipamentoComponent implements OnInit {

  title = 'Cadastro de usuários';

  usuarioDialogo: boolean;

  departamentos: Departamento[];
  departamentoSelecionado: Departamento;


  usuarios: Usuario[];
  usuario: Usuario;

  usuariosSelecionados: Usuario[];

  submitted: boolean;


  constructor(private usuarioService: UserService, 
      private messageService: MessageService, 
      private confirmationService: ConfirmationService) {

    
        }

  ngOnInit() {
      this.listarUsuarios();
   
    
   
  }


  listarDepartamentos(){
      
      this.usuarioService.getDepartamentos()
          .subscribe(
              data => {
                  this.departamentos = data;
              },
              error => {
                  console.log(error);
              });
  }





  
  listarUsuarios(): void {
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


      


  abrirNovo(){
      
      this.usuario = {};
      this.submitted = false;
      this.usuarioDialogo = true;
      this.departamentoSelecionado={};
      this.listarDepartamentos();

     
  }

  deletarUsuariosSelecionados(){

      this.confirmationService.confirm({
          message: 'Tem certeza que vai  deletar os usuarios Selecioandos?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.usuarios = this.usuarios.filter(val => !this.usuariosSelecionados.includes(val));
              this.usuariosSelecionados = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'usuarios deletados', life: 3000});
          }
      });
  }

  salvaUsuario(){

      this.submitted = true;
      

      if (this.usuario.nome.trim()) {
          this.usuario.departamento_fk = this.departamentoSelecionado.id_departamento;
      
          if (this.usuario.id_usuario) {
              this.usuarioService.updateUsuario(this.usuario.id_usuario, this.usuario)
              .subscribe(
                  response => {
                  console.log(response);
                  this.submitted = true;
                  },
                  error => {
                  console.log(error);
                  });
              this.usuarios[this.findIndexById(this.usuario.id_usuario)] = this.usuario;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'usuario atualizado', life: 3000});
          }
          else {
              this.usuarioService.addUsuario(this.usuario)
              .subscribe(
                  response => {
                  console.log(response);
                  this.submitted = true;
                  },
                  error => {
                  console.log(error);
                  });
              this.usuarios.push(this.usuario);
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Equpamento salvo', life: 3000});
          }

          this.usuarios = [...this.usuarios];
          this.usuarioDialogo = false;
          this.usuario = {};
      }

     // const setor:Setor={};
     // setor.usuario_fk

      //this.usuarioService.addSetor(setor);
  }


  deletaUsuario(usuario: Usuario){

      const id = usuario.id_usuario;

      this.confirmationService.confirm({
          message: 'Tem certeza que quer deletar o usuário ' + usuario.id_usuario+ '?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel:'Sim',
          rejectLabel:'Não',

          accept: () => {
            

              this.usuarioService.deleteUsuario(id)
              .subscribe(
                  response => {
                      console.log(response);
                      this.usuarios = this.usuarios.filter(val =>  val.id_usuario !== usuario.id_usuario);
                      this.usuario = {};
                      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Usuário deletado', life: 3000});
                  },
                  error => {
                  console.log(error);
                  });

             
          }
      });
  }

  editaUsuario(usuario: Usuario) {

      this.usuario = {...usuario};
      this.usuarioDialogo = true;
  }

  escondeDialogo(){

      this.usuarioDialogo = false;
      this.submitted = false;

  }


  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.usuarios.length; i++) {
          if (this.usuarios[i].id_usuario === id) {
              index = i;
              break;
          }
      }

      return index;
  }




}

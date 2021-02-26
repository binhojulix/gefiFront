import { Area } from '../models/Area';
import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UserService } from '../service/user.service';
import { AreaService } from '../service/area.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  
    title = 'Cadastro de usuários';

    usuarioDialogo: boolean;

    areas: Area[];
    AreaSelecionado: Area;
 

    usuarios: Usuario[];
    usuario: Usuario;

    usuariosSelecionados: Usuario[];

    submitted: boolean;


    constructor(private usuarioService: UserService, 
        private areaService: AreaService, 
        private messageService: MessageService, 
        private confirmationService: ConfirmationService) {

      
          }

    ngOnInit() {
        this.listarUsuarios();
    }


    listarAreas(){
        
        this.areaService.getAreas()
            .subscribe(
                data => {
                    this.areas = data;
                    console.log(this.areas)
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
            },
            error => {
                console.log(error);
            });
        }


        
 

    abrirNovo(){
        
        this.usuario = {};
        this.submitted = false;
        this.usuarioDialogo = true;
        this.AreaSelecionado={};
        this.listarAreas();

       
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
          
        
            if (this.usuario.id) {
                this.usuarioService.updateUsuario(this.usuario.id, this.usuario)
                .subscribe(
                    response => {
                    this.submitted = true;
                    },
                    error => {
                    console.log(error);
                    });
                this.usuarios[this.findIndexById(this.usuario.id)] = this.usuario;
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

       
    }


    deletaUsuario(usuario: Usuario){

        const id = usuario.id;

        this.confirmationService.confirm({
            message: 'Tem certeza que quer deletar o usuário ' + usuario.id + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel:'Sim',
            rejectLabel:'Não',

            accept: () => {
              

                this.usuarioService.deleteUsuario(id)
                .subscribe(
                    response => {
                        console.log(response);
                        this.usuarios = this.usuarios.filter(val =>  val.id !== usuario.id);
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


    findIndexById(id: Number): number {
        let index = -1;
        for (let i = 0; i < this.usuarios.length; i++) {
            if (this.usuarios[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }




}

import { Usuario } from './../models/usuario';
import { AutenticadorService } from './../service/autenticador.service';
import { Component, OnInit, Input } from '@angular/core';
import { Equipamento } from '../models/equipamento';
import { EquipamentoService } from '../service/equipamento.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.css']
})
export class EquipamentoComponent implements OnInit {

    equipamentoDialogo: boolean;

    equipamentos: Equipamento[];

    equipamento: Equipamento;

    equipamentosSelecionados: Equipamento[];
    
    currentUser:Usuario;

    submitted: boolean;

    constructor(private equipamentoService: EquipamentoService, 
        private messageService: MessageService, 
        private confirmationService: ConfirmationService,
        private authenticationService: AutenticadorService) {
            this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
         }

   
    listarEquipamentos(): void {
        this.equipamentoService.getEquipamentos()
            .subscribe(
            data => {
                this.equipamentos = data;
                console.log( data);
            },
            error => {
                console.log(error);
            });
        }


    ngOnInit() {
        this.listarEquipamentos();
        console.log("total de equipamentos")
        console.log(this.equipamentos);
    }

    abrirNovo(){
        
        this.equipamento = {};
        this.submitted = false;
        this.equipamentoDialogo = true;
    }

    deletarEquipamentosSelecionados(){

        this.confirmationService.confirm({
            message: 'Tem certeza que vai  deletar os equipamentos Selecioandos?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel:'Sim',
            rejectLabel:'Não',
            accept: () => {

                this.equipamentosSelecionados.forEach((eqpt)=>{
                    const id = eqpt.id_equipamento;
                    this.equipamentoService.deleteEquipamento(id)
                    .subscribe(
                        response => {
                            console.log(response);
                        },
                        error => {
                        console.log(error);
                        });
                });

   
               
                this.equipamentos = this.equipamentos.filter(val => !this.equipamentosSelecionados.includes(val));
                this.equipamentosSelecionados = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Equipamentos deletados', life: 3000});
            }
        });
    }

    salvarEquipamento(){

        this.submitted = true;

        if (this.equipamento.descricao_equipamento.trim()) {
            if (this.equipamento.id_equipamento) {

                this.equipamentoService.updateEquipamento(this.equipamento.id_equipamento, this.equipamento)
                .subscribe(
                    response => {
                    console.log(response);
                    this.submitted = true;
                    },
                    error => {
                    console.log(error);
                    });

                this.equipamentos[this.findIndexById(this.equipamento.id_equipamento)] = this.equipamento;                
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Equipamento atualizado', life: 3000});
            }
            else {

                this.equipamentoService.addEquipamento(this.equipamento)
                .subscribe(
                    response => {
                    console.log(response);
                    this.submitted = true;
                    },
                    error => {
                    console.log(error);
                    });
                    
                this.equipamento.id_equipamento = this.createId();
                this.equipamentos.push(this.equipamento);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Equpamento salvo', life: 3000});
            }

            this.equipamentos = [...this.equipamentos];
            this.equipamentoDialogo = false;
            this.equipamento = {};

        }
    }


    deletaEquipamento(equipamento: Equipamento){
        const id = equipamento.id_equipamento;

        this.confirmationService.confirm({
            message: 'Tem certeza que quer deletar o equipamento ' + equipamento.descricao_equipamento + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel:'Sim',
            rejectLabel:'Não',

            accept: () => {
              

                this.equipamentoService.deleteEquipamento(id)
                .subscribe(
                    response => {
                        console.log(response);
                        this.equipamentos = this.equipamentos.filter(val =>  val.id_equipamento
                             !== equipamento.id_equipamento);
                        this.equipamento = {};
                        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Equipamento deletado', life: 3000});
                    },
                    error => {
                    console.log(error);
                    });

               
            }
        });
    }

    editaEquipamento(equipamento: Equipamento) {
        this.equipamento = {...equipamento};
        this.equipamentoDialogo = true;
        
    }

    esconderDialogo(){

        this.equipamentoDialogo = false;
        this.submitted = false;
    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.equipamentos.length; i++) {
            if (this.equipamentos[i].id_equipamento === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }


}

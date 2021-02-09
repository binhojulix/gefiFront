import { Usuario } from './../models/usuario';
import { AutenticadorService } from './../service/autenticador.service';
import { Component, OnInit, Input } from '@angular/core';
import { Controle } from '../models/controle';
import { ControleService } from '../service/controle.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-falha-equipamento',
  templateUrl: './falha-equipamento.component.html',
  styleUrls: ['./falha-equipamento.component.css']
})
export class FalhaEquipamentoComponent implements OnInit {

    controleDialogo: boolean;

    controles: Controle[];
    controlesSelecionado:Controle[];

    controle: Controle;
    
    currentUser:Usuario;

    submitted: boolean;

    constructor(private controleService: ControleService, 
        private messageService: MessageService, 
        private confirmationService: ConfirmationService,
        private authenticationService: AutenticadorService) {
            this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
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
        


    ngOnInit() {
        this.listarControles();
        console.log("total de equipamentos")
        console.log(this.controles);
    }

    abrirNovo(){
        
        this.controle = {};
        this.submitted = false;
        this.controleDialogo = true;
    }

   
    atualizaControle(){

        this.submitted = true;
        this.controleService.updateControle(this.controle)
        .subscribe(
            response => {
                console.log(response);
            this.submitted = true;
        },
        error => {
            console.log(error);
        });

    
        this.controles.push(this.controle);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Status atualizado', life: 3000});


        this.controles = [...this.controles];
        this.controleDialogo = false;
        this.controle = {};

        
    }


    validaFalhaDoEquipamento(controle: Controle){
        const id = controle.id_usuario_equipamento;

        this.confirmationService.confirm({
            message: 'Tem certeza que quer deletar o equipamento ' + controle.equipamento.descricao_equipamento + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel:'Sim',
            rejectLabel:'Não',

            accept: () => {
              

                this.controleService.updateControle(controle)
                .subscribe(
                    response => {
                        console.log(response);
                        this.controles = this.controles.filter(val =>  val.id_usuario_equipamento
                             !== this.controle.id_usuario_equipamento);
                        this.controle = {};
                        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Equipamento deletado', life: 3000});
                    },
                    error => {
                    console.log(error);
                    });

               
            }
        });
    }

    editaControle(controle:Controle) {
        this.controle = {...controle};
        this.controleDialogo = true;
        
    }

    esconderDialogo(){

        this.controleDialogo = false;
        this.submitted = false;
    }


 

}

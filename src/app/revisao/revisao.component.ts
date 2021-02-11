import { Usuario } from '../models/usuario';
import { AutenticadorService } from '../service/autenticador.service';
import { Component, OnInit, Input } from '@angular/core';
import { Controle } from '../models/controle';
import { ControleService } from '../service/controle.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-revisao',
  templateUrl: './revisao.component.html',
  styleUrls: ['./revisao.component.css']
})
export class RevisaoComponent implements OnInit {

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

<<<<<<< HEAD:src/app/revisao/revisao.component.ts
    deletarEquipamentosSelecionados(){

        this.confirmationService.confirm({
            message: 'Tem certeza que vai  deletar os equipamentos Selecioandos?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel:'Sim',
            rejectLabel:'Não',
            accept: () => {

                this.equipamentosSelecionados.forEach((eqpt)=>{
                    const id = eqpt.id;
                    this.equipamentoService.deleteEquipamento(id)
                    .subscribe(
                        response => {
                            console.log(response);
                        },
                        error => {
                        console.log(error);
                        });
                });

=======
>>>>>>> 8c3d6f9565149ead68b9c7bf08a9ef63359915b9:src/app/falha-equipamento/falha-equipamento.component.ts
   
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

<<<<<<< HEAD:src/app/revisao/revisao.component.ts
        if (this.equipamento.descricao.trim()) {
            if (this.equipamento.id) {

                this.equipamentoService.updateEquipamento(this.equipamento)
                .subscribe(
                    response => {
                    console.log(response);
                    this.submitted = true;
                    },
                    error => {
                    console.log(error);
                    });

                this.equipamentos[this.findIndexById(this.equipamento.id)] = this.equipamento;                
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
                    
      
                this.equipamentos.push(this.equipamento);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Equpamento salvo', life: 3000});
            }
=======
    
        this.controles.push(this.controle);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Status atualizado', life: 3000});

>>>>>>> 8c3d6f9565149ead68b9c7bf08a9ef63359915b9:src/app/falha-equipamento/falha-equipamento.component.ts

        this.controles = [...this.controles];
        this.controleDialogo = false;
        this.controle = {};

        
    }


<<<<<<< HEAD:src/app/revisao/revisao.component.ts
    validaEquipamento(equipamento: Equipamento){
        const id = equipamento.id;

        this.confirmationService.confirm({
            message: 'Confirma tratamento da indisponibilidade do equipamento ' + equipamento.descricao + '?',
=======
    validaFalhaDoEquipamento(controle: Controle){
        const id = controle.id_usuario_equipamento;

        this.confirmationService.confirm({
            message: 'Validar equipamento ' + controle.equipamento.descricao_equipamento + '?',
>>>>>>> 8c3d6f9565149ead68b9c7bf08a9ef63359915b9:src/app/falha-equipamento/falha-equipamento.component.ts
            header: 'Confirmar',
            icon: 'pi pi-check',
            acceptLabel:'Sim',
            rejectLabel:'Não',

            accept: () => {
              

                this.controleService.updateControle(controle)
                .subscribe(
                    response => {
                        console.log(response);
<<<<<<< HEAD:src/app/revisao/revisao.component.ts
                        this.equipamentos = this.equipamentos.filter(val =>  val.id
                             !== equipamento.id);
                        this.equipamento = {};
=======
                        this.controles = this.controles.filter(val =>  val.id_usuario_equipamento
                             !== this.controle.id_usuario_equipamento);
                        this.controle = {};
>>>>>>> 8c3d6f9565149ead68b9c7bf08a9ef63359915b9:src/app/falha-equipamento/falha-equipamento.component.ts
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


<<<<<<< HEAD:src/app/revisao/revisao.component.ts
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



=======
 
>>>>>>> 8c3d6f9565149ead68b9c7bf08a9ef63359915b9:src/app/falha-equipamento/falha-equipamento.component.ts

}

import { Component, OnInit, Input } from '@angular/core';
import { Controle } from '../models/controle';
import { ControleService } from '../service/controle.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit {

  controleDialogo: boolean;

  controles: Controle[];

  controle: Controle;

  controlesSelecionados: Controle[];

  submitted: boolean;

  constructor(private controleService: ControleService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService) { }

    

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
    this.controleDialogo = true;
  }

  esconderDialogo(){

    this.controleDialogo = false;
    this.submitted = false;

  }

  salvarControle(){
    
  }



}

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
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit {

  controleDialogoAssociarUsuario: boolean;



  usuarios: Usuario[];
  equipamentos:Equipamento[];
  usuarioSelecionado:Usuario;
  equipamentoSelecionado:Equipamento;
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
      this.countries = [
        { name: "Australia", code: "01" },
        { name: "Brazil", code: "02" },
        { name: "China", code: "03" },
        { name: "Egypt", code: "04" },
        { name: "France", code: "05" },
        { name: "Germany", code: "06" },
        { name: "India", code: "07" },
        { name: "Japan", code: "08" },
        { name: "Spain", code: "09" },
        { name: "United States", code: "10" }
      ];
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
        
    this.equipamentoService.getEquipamentos()
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
    
  }



}

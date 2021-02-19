import { Area } from "./Area";
import { Equipamento } from "./equipamento";
import { Usuario } from "./usuario";
import { Pendencia } from "./pendencia";
import { Solicitacao } from "./solicitacao";

export interface Controle {
      id?:Number;
      status?:string;
      disponivel?:boolean;
      pendente?:boolean;
      coletivo?:boolean;
      equipamento?:Equipamento;
      usuario?:Usuario;
      area?:Area;
      pendencias?:Array<Pendencia>;
      solicitacoes?:Array<Solicitacao>;
      

}

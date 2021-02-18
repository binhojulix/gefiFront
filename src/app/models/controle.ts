import { Area } from "./Area";
import { Equipamento } from "./equipamento";
import { Usuario } from "./usuario";

export interface Controle {
      id?:Number;
      motivo_falha?:string;
      solucao_falha?:Date;
      data_falha?:Date;
      data_solucao?:Date; 
      disponivel?:boolean;
      equipamento?:Equipamento;
      usuario?:Usuario;
      area?:Area;

}

import { Area } from "./Area";
import { Equipamento } from "./equipamento";
import { Usuario } from "./usuario";

export interface Solicitacao{

    id?:Number;
    motivo_falha?:string;
    solucao_falha?:string;
    data_solicitacao?:Date;
    data_devolucao?:Date; 
    disponivel?:boolean;
    equipamento?:Equipamento;
    usuario?:Usuario;
    area?:Area;
  

   
      
}
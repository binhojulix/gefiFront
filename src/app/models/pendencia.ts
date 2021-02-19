import { Controle } from "./controle";


export interface Pendencia {
    id?:Number;
    motivo_pendencia?:string;
    solucao_pendencia?:string;
    data_pendencia?:Date;
    data_solucao?:Date; 
    controle?:Controle;
  
}

import { Area } from "./Area";
import { Equipamento } from "./equipamento";
import { Usuario } from "./usuario";

export interface Controle {
    id?:Number;
    area?:Area;
    usuario?:Usuario;
    equipamento?:Equipamento;
    status?:string;
    dataSolicitacao?:Date;
    dataDevolucao?:Date;
    dataRevisao?:Date;
    isDisponivel?:boolean;
    indisponibilidade?:string;
    solucao?:string;
    individual?:boolean;

}

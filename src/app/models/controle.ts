import { Area } from "./Area";
import { Equipamento } from "./equipamento";
import { Usuario } from "./usuario";

export interface Controle {
    id?:Number;
    area?:Area;
    solicitante?:Usuario;
    equipamento?:Equipamento;
    isDisponivelParaSolicitacao?:boolean;
    dataSolicitacao?:Date;
    dataDevolucao?:Date;

    isIndividual?:boolean;
    responsavel?:Usuario;
    usuarioValidador?:Usuario;
    dataIndisponibilidade?:Date;
    dataSolucao?:Date;
    isDisponivelparaUso?:boolean;
    indisponibilidade?:string;
    solucao?:string;
   

}

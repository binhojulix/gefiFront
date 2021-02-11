import { Area } from "./area";
import { Equipamento } from "./equipamento";
import { Usuario } from "./usuario";

export interface Controle {
    id?:Number;
    usuario?:Usuario;
    equipamento?:Equipamento;
    status?:string;
    dataSolicitacao?:Date;
    dataDevolucao?:Date;

}

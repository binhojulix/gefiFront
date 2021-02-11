import { Equipamento } from "./equipamento";
import { Usuario } from "./usuario";

export interface Revisao {
    id?:Number;
    equipamento?:Equipamento;
    usuario?:Usuario;
    dataRevisao?:Date;
    isDisponivel?:boolean;
    indisponibilidade?:string;
    solucao?:string;
}

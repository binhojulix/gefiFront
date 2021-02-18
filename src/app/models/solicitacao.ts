import { Controle } from "./controle";
import { Usuario } from "./usuario";

export interface Solicitacao{

    id?:Number;
    data_solicitacao?:Date;
    data_devolucao?:Date; 
    controle?:Controle; 
    usuario?:Usuario;
}
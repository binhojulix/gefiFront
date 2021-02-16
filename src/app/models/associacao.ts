import { Equipamento } from "./equipamento";
import { Usuario } from "./usuario";

export interface Associacao {
    id:Number;
    equipamento: Equipamento;
    usuario?:Usuario;
}

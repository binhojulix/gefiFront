import { Departamento } from "./departamento";
import { Equipamento } from "./equipamento";
import { Usuario } from "./usuario";

export interface Controle {
    id_usuario_equipamento?:Number;
    usuario?:Usuario;
    equipamento?:Equipamento;
    status?:string;

}

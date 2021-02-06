import { Departamento } from "./departamento";
import { Equipamento } from "./equipamento";
import { Usuario } from "./usuario";

export interface Controle {
    id?:string;
    dataDevolucao?:Date;
    usuario?:Usuario;
    equipamento?:Equipamento;
    dataRetirada?:Date;
    departamento?:Departamento;
}

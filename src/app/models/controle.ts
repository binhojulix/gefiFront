import { Area } from "./area";
import { Equipamento } from "./equipamento";
import { Usuario } from "./usuario";

export interface Controle {
    id?:Number;
    usuario?:Usuario;
    equipamento?:Equipamento;
    status?:string;
<<<<<<< HEAD
    dataSolicitacao?:Date;
    dataDevolucao?:Date;
=======
    pendencia?:string;
>>>>>>> 8c3d6f9565149ead68b9c7bf08a9ef63359915b9

}

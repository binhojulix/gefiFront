import {Area } from "./Area";
import { Role } from "./role";

export interface Usuario {
    id?:Number;
    nome?:string;
    login?:string;
    matricula?:string;
    senha?:string;
    authdata?:string;
    token?:string;
    area?:Area;
    role?:Role;
}

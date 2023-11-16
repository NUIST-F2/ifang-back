import { IsString, isString } from "class-validator";
import { Role } from "src/role/roles.enum";



export class signInDto{

    id:number;

    @IsString()
    username:string;
    @IsString()
    password:string;
    @IsString()
    role:Role
}
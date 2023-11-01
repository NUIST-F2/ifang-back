import { IsString, isString } from "class-validator";



export class CreateUserDto{

    id:number;

    @IsString()
    username:string;
    @IsString()
    password:string;
    @IsString()
    Types:string;
}
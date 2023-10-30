import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class User{
    id:number;
    username:string;
    password:string;
    type:string;
}
import { Role } from "src/role/roles.enum";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @Column() //列
    id:number;
    @PrimaryGeneratedColumn() //主键列
    username:string;
    @Column() //列
    password:string;
    @JoinTable() //列
    role:Role[];
}
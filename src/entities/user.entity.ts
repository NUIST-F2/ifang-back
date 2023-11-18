import { Role } from "src/role/roles.enum";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @Column() //列
    id: number;
    @PrimaryColumn() //主键列
    username: string;
    @Column() //列
    password: string;
    @Column({
        type: "enum",
        enum: Role,
    })
    role: Role
}
import { Role } from "src/role/roles.enum";
import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @Column() //列
    @PrimaryGeneratedColumn()
    id: number;
    @Index({unique:true})
    @Column({ unique: true }) //主键列
    username: string;
    @Column() //列
    password: string;
    @Column({
        type: "enum",
        enum: Role,
    })
    role: Role
}
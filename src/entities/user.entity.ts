import { Role } from "src/role/roles.enum";
import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn() //列
    id: number;
    @Index({ unique: true })
    @Column({ unique: true })
    username: string;
    @Column() //列
    password: string;
    @Column({
        type: "enum",
        enum: Role,
    })
    role: Role
}
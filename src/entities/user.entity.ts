import { Role } from "src/role/roles.enum";
import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";

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

    @OneToOne(() => Profile, profile => profile.user) // 使用@OneToOne定义一对一关系  
    profile: Profile;  
}
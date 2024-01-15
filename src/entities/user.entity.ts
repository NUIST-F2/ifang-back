import { Role } from "src/role/roles.enum";
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";

@Entity()
export class User {
    @Column() //列
    @PrimaryGeneratedColumn()
    id: number;
    @Index({ unique: true })
    @Column({ unique: true }) //主键列
    username: string;
    @Column() //列
    password: string;
    @Column({
        type: "enum",
        enum: Role,
    })
    role: Role

    @OneToOne(() => Profile, profile => profile.user, { cascade: true, eager: true })
    @JoinColumn()
    profile: Profile;
    //依旧存在三个表格不完善情况，需要修改，详细见GitHub issue  
}
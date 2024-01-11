import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Role } from 'src/role/roles.enum';
import { Permission } from './permission.entity';
@Entity()
export class Profile {
  @Column() //列
  @PrimaryGeneratedColumn()
  id: number;
  @Index({ unique: true })
  @Column({ unique: true }) //主键列
  username: string;
  @Column() //列
  password: string;
  @BeforeInsert()
  @BeforeUpdate()
  updateUser(): void {
    this.user.id = this.id;
    this.user.username = this.username;
    this.user.password = this.password;
    this.user.role = this.role;
  }
  @Column()
  tel: string;
  @Column()
  mail: string;
  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;
 
  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn()
  user: User;

  @JoinTable()
  @ManyToMany(type =>Permission,permissions=>permissions.profile,{
      cascade:true,//insert 级联插入
  })
  permissions: Permission[];
}

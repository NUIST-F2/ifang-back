import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Role } from 'src/role/roles.enum';
import { Permission } from './permission.entity';
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Index({ unique: true })
  @Column({ unique: true })
  username: string;
  @Column() //列
  password: string;
  @Column()
  tel: string;
  @Column()
  mail: string;
  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @JoinColumn()
  @OneToOne(() => User, { cascade: true, eager: true })
  user: User;


  @BeforeInsert()
  @BeforeUpdate()
  updateUser(): void {  
    if (!this.user) {  
      this.user = new User();  
    }  
    this.user.id = this.id;  
    this.user.username = this.username;  
    this.user.password = this.password;  
    this.user.role = this.role;  
  }  

  @OneToMany(type => Permission, permission => permission.name)  
  permissions: Permission[];  
}

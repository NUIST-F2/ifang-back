import { profile } from 'console';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Permission {
  @Column('simple-array')
  name: string;

  @ManyToMany(type => Profile,profile =>profile.permissions)
  
  profile : Profile[];
}

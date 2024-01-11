import {
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Permission {
  @Column('simple-array')
  name: string;

  @ManyToMany(type => Profile,profile =>profile.permissions)
  
  profile : Profile[];
}

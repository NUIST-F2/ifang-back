import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import internal from 'stream';

@Entity()
export class Permission {

  @PrimaryColumn()
  pmid:number;
  @Column()
  name: string;
  @ManyToOne(type => Profile, profile => profile.permissions)  
  profile: Profile;  

}

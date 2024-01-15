import {
  Column,
  Entity,
  ManyToMany,
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
  @ManyToMany(() => Profile, profile => profile.permissions)
  profile:Profile[];

}

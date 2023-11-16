import { IsString, isString } from 'class-validator';
import { Role } from 'src/role/roles.enum';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  userName: string;
  @IsString()
  password: string;
  @IsString()
  role: Role;
}

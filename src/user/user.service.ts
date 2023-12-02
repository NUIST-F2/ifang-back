import { HttpException, HttpStatus, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository,DataSource} from 'typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { Role } from 'src/role/roles.enum';
import { resolveNs } from 'dns';
import { Roles } from 'src/role/roles.decorator';
@Injectable({scope:Scope.TRANSIENT})
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
        private readonly connection:DataSource,
    ){
        console.log('111')///text of git
    }
    async createUser(createUserDto:CreateUserDto){
        /* username:string,password:string,Types:string */
        /*         const user:User = {
            id: this.users.length + 1,
            username,
            password,
            Types,
            
        };
        this.users.push(user);
        return user; */
        const user = this.userRepository.create({...createUserDto});
        return this.userRepository.save(user);
    }
  /*   findUserByUsername(username: string): User {
        return this.users.find(user => user.username === username);
    }*/


    async findUserByUsername(username:string):Promise<User>{
        const User = await this.userRepository.findOne({where:{username:username}});
        if(!User)
        {
            throw new HttpException(`username #${username} not found!!`,HttpStatus.NOT_FOUND);
            
        }
        return User;
    }

    async findUserById(id:number):Promise<User>{
        const User = await this.userRepository.findOne({where:{id:id}});
        if(!id)
        {
            throw new HttpException(`id #${id} not found!!`,HttpStatus.NOT_FOUND);
        }
        return User;
    }


    async updateUser(username:string,updateUserDto:UpdateUserDto){
        //const existingCoffee = this.findOne(id);
        //if(existingCoffee){
            //update the existing entity
        //}
        
        const user = await this.userRepository.preload({
            username: username,
            ...updateUserDto,
        });
        if(!user)
        {
            throw new NotFoundException(`Coffee #${username} not found !!!`);
        }
        return this.userRepository.save(user);
    }

    async deleteUserByUsername(username:string)
    {
        const user = await this.findUserByUsername(username);
        return this.userRepository.remove(user);
    }

    async deleteUserById(id:number)
    {
        const user = await this.findUserById(id);
        return this.userRepository.remove(user);
    }


    //需要完成用户个人信息页面




}

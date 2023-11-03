import { HttpException, HttpStatus, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository,DataSource} from 'typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
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
    async validateUser(username: string, password: string,Types:string): Promise<boolean> {
        const user = await this.findUserByUsername(username);
        return user && (user).password === password && user.Types === Types;
    }


    async findUserByUsername(username:string):Promise<User>{
        const User = await this.userRepository.findOne({where:{username:username}});
        if(!User)
        {
            throw new HttpException(`username #${username} not found!!`,HttpStatus.NOT_FOUND);
            
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



}

import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
    private users:User[]= [];
    createUser(username:string,password:string,Types:string):User{
        const user:User = {
            id: this.users.length + 1,
            username,
            password,
            Types,
            
        };
        this.users.push(user);
        return user;
    }
    findUserByUsername(username: string): User {
        return this.users.find(user => user.username === username);
    }
    validateUser(username: string, password: string,Types:string): boolean {
        const user = this.findUserByUsername(username);
        return user && user.password === password && user.Types === Types;
    }



}

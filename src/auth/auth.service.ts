import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/role/roles.enum';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {

    constructor(private readonly userService:UserService,private readonly jwtService:JwtService){}
    async validateUser(username: string, password: string,role:Role[]): Promise<boolean> {
        const user = await this.userService.findUserByUsername(username);
        return user && (user).password === password && user.role === role;
    }

    async signIn(username,pass)
    {
        const user = await this.userService.findUserByUsername(username);
        if(user?.password !== pass){
            throw new UnauthorizedException();
        }
        const payload = {sub:user.id,username:user.username};
        return{
            access_token:await this.jwtService.signAsync(payload),
        };
    }









}

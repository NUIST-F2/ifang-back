import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport"
import { AuthService } from "./auth.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Role } from "src/role/roles.enum";

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy){
    constructor(private readonly authService:AuthService){
        super();
    }
    async validate(username: string, password: string,role:Role): Promise<any> {
      
        
        const user = await this.authService.validateUser(username, password,role);
        console.log(user);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }

      
      
      
}


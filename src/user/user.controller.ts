import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){

    }

    @Post()
    create(@Body() createUserDto:CreateUserDto)
    {
        //return body;
        console.log(createUserDto instanceof CreateUserDto);
        return this.userService.createUser(createUserDto);
    }


}

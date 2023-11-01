import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('user')
export class UserController {
    @Post()
    create(@Body() createUserDto:CreateUserDto)
    {
        //return body;
        console.log(createUserDto instanceof CreateUserDto);
        return this.userserviv.create(createCoffeeDto);
    }


}

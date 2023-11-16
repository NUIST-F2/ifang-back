import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from './user.service';
import { Roles } from 'src/role/roles.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){

    }

    @Post()
    @Roles('admin','user')
    create(@Body() createUserDto:CreateUserDto)
    {
        //return body;
        console.log(createUserDto instanceof CreateUserDto);
        return this.userService.createUser(createUserDto);
    }
    
    @Delete(':id')
    @Roles('admin')
    deleteUserById(@Param('id') id:number)
    {
        return this.userService.deleteUserById(id);
    }
    
    @Delete(':username')
    @Roles('admin')
    deleteUserByUsername(@Param('username')username:string)
    {
        return this.userService.deleteUserByUsername(username);
    }

    @Get(':id')
    findUserById(@Param('id')id:number)
    {
        return this.findUserById(id);
    }

    @Get(':username')
    findUserByUsername(@Param('username')username:string)
    {
        return this.findUserByUsername(username);
    }



}

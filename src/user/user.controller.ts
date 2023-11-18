import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from './user.service';
import { Roles } from 'src/role/roles.decorator';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@UseGuards(AuthGuard)
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
    

    @Roles('admin')
    @Delete(':id')
    deleteUserById(@Param('id') id:number)
    {
        return this.userService.deleteUserById(id);
    }


    @Roles('admin')
    @Delete(':username')
    deleteUserByUsername(@Param('username')username:string)
    {
        return this.userService.deleteUserByUsername(username);
    }

    @Get(':id')
    findUserById(@Param('id')id:number)
    {
        if(!this.userService.findUserById(id)){
            throw new HttpException(`id #${id} not found!!`,HttpStatus.NOT_FOUND);
        }
        return this.userService.findUserById(id);
    }

    @Get('/:username')
    findUserByUsername(@Param('username') username:string)
    {
        return this.userService.findUserByUsername(username);
    }

    @Roles('admin')
    @Patch(':id')
    update(@Param('id') id:string  ,@Body() updateUserDto:UpdateUserDto){
        return this.userService.updateUser(id, updateUserDto);
    }



}

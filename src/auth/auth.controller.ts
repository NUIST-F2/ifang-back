import { Controller, Post, Body, Session, Get, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { Role } from 'src/role/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body()createUserDto:CreateUserDto) {
    const user = this.userService.createUser(createUserDto);
    return { message: '注册成功', user }; 
  }
  @Post('login')
  login(@Body() userInfo: { username: string; password: string ;role:Role[]}, @Session() session: any) {
    const { username, password,role} = userInfo;
    const isValidUser = this.userService.validateUser(username, password,role);
    if (isValidUser) {
      session.user = { username }; // 将用户信息写入会话
      return { message: '登录成功', user: { username } };
    } else {
      return { message: '用户名或密码错误' };
    }
  }

  // 使用受保护的路由示例
  @Get('protected')
  protectedRoute() {
    return { message: '这是一个受保护的路由' };
  }
}
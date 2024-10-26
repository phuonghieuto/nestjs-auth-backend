import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserResponseType } from './type/userResponse.type';
import { LoginDto } from './dto/login.dto';
import { ExpressRequest } from '../middleware/auth.middleware';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user/register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  async login(@Body() loginDto: LoginDto): Promise<UserResponseType> {
    const user = await this.userService.loginUser(loginDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(
    @Request() request: ExpressRequest,
  ): Promise<UserResponseType> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const token = request.headers['authorization'].split(' ')[1];
    return this.userService.buildUserResponse(request.user, token);
  }
}
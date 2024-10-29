import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { ExpressRequest } from '../middleware/auth.middleware';
import { Response } from 'express';
import { State } from '../state/state';
import { StatusNotification } from '../state/status-notification';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('user/register')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    this.logger.log('Registering a new user');
    const state = await this.userService.createUser(createUserDto);
    return res.status(HttpStatus.OK).json(state);
  }

  @Post('users/login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<any> {
    this.logger.log('User login attempt');
    const state = await this.userService.loginUser(loginDto);
    return res.status(HttpStatus.OK).json(state);
  }

  @Get('user')
  async currentUser(
    @Request() request: ExpressRequest,
    @Res() res: Response,
  ): Promise<any> {
    this.logger.log('Fetching current user');
    if (!request.user) {
      return res
        .status(HttpStatus.OK)
        .json(State.builder().forUnauthorized('Unauthorized'));
    }
    const user = await this.userService.findByEmail(request.user.email);
    if (!user) {
      return res
        .status(HttpStatus.OK)
        .json(State.builder().forUnauthorized('Unauthorized'));
    }
    const token = request.headers['authorization'].split(' ')[1];
    return res
      .status(HttpStatus.OK)
      .json(
        State.builder().forSuccess(
          this.userService.buildUserResponse(user, token),
        ),
      );
  }
}
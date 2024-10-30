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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiOperation({ summary: 'Check if the service is working' })
  @ApiResponse({ status: 200, description: 'Service is working' })
  async home(@Res() res: Response): Promise<any> {
    return res.status(HttpStatus.OK).json("It's working!");
  }

  @Post('user/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 200, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    this.logger.log('Registering a new user');
    const state = await this.userService.createUser(createUserDto);
    return res.status(HttpStatus.OK).json(state);
  }

  @Post('users/login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<any> {
    this.logger.log('User login attempt');
    const state = await this.userService.loginUser(loginDto);
    return res.status(HttpStatus.OK).json(state);
  }

  @Get('user')
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({
    status: 200,
    description: 'Current user fetched successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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

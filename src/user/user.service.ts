import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserResponseDto } from './dto/user-response.dto';
import { State } from '../state/state';
import { StatusNotification } from '../state/status-notification';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
    private configService: ConfigService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<State<UserResponseDto, string>> {
    this.logger.log('Creating a new user');
    const user = await this.userModel.findOne({ email: createUserDto.email });

    if (user) {
      this.logger.warn(`Email ${createUserDto.email} is already taken`);
      return State.builder<UserResponseDto, string>().forError('Email is already taken');
    }

    try {
      const createdUser = new this.userModel(createUserDto);
      this.logger.log(`User ${createUserDto.email} created successfully`);
      return State.builder<UserResponseDto, string>().forSuccess(this.buildUserResponse(await createdUser.save()));
    } catch (error) {
      this.logger.error('Error creating user:', error);
      return State.builder<UserResponseDto, string>().forError('Internal Server Error');
    }
  }

  async loginUser(loginDto: LoginDto): Promise<State<UserResponseDto, string>> {
    this.logger.log(`Logging in user ${loginDto.email}`);
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');

    if (!user) {
      this.logger.warn(`User ${loginDto.email} not found`);
      return State.builder<UserResponseDto, string>().forError('User not found');
    }

    const isPasswordCorrect = await compare(loginDto.password, user.password);

    if (!isPasswordCorrect) {
      this.logger.warn(`Incorrect password for user ${loginDto.email}`);
      return State.builder<UserResponseDto, string>().forError('Incorrect password');
    }

    this.logger.log(`User ${loginDto.email} logged in successfully`);
    return State.builder<UserResponseDto, string>().forSuccess(this.buildUserResponse(user));
  }

  buildUserResponse(userEntity: UserEntity, token?: string): UserResponseDto {
    return {
      name: userEntity.name,
      email: userEntity.email,
      token: token ?? this.generateJwt(userEntity),
      createdAt: userEntity.createdAt,
    };
  }

  generateJwt(userEntity: UserEntity): string {
    return sign(
      { email: userEntity.email },
      this.configService.get<string>('JWT_SECRET'),
      { expiresIn: this.configService.get<string>('JWT_EXPIRATION') },
    );
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userModel.findOne({ email });
  }
}
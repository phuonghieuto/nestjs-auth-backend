import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { UserResponseDto } from './dto/user-response.dto';
import { State } from '../state/state';
export declare class UserService {
    private userModel;
    private configService;
    private readonly logger;
    constructor(userModel: Model<UserEntity>, configService: ConfigService);
    createUser(createUserDto: CreateUserDto): Promise<State<UserResponseDto, string>>;
    loginUser(loginDto: LoginDto): Promise<State<UserResponseDto, string>>;
    buildUserResponse(userEntity: UserEntity, token?: string): UserResponseDto;
    generateJwt(userEntity: UserEntity): string;
    findByEmail(email: string): Promise<UserEntity>;
}

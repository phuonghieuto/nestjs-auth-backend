import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { ExpressRequest } from '../middleware/auth.middleware';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto, res: Response): Promise<any>;
    login(loginDto: LoginDto, res: Response): Promise<any>;
    currentUser(request: ExpressRequest, res: Response): Promise<any>;
}

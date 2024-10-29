"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const state_1 = require("../state/state");
let UserService = UserService_1 = class UserService {
    constructor(userModel, configService) {
        this.userModel = userModel;
        this.configService = configService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async createUser(createUserDto) {
        this.logger.log('Creating a new user');
        const user = await this.userModel.findOne({ email: createUserDto.email });
        if (user) {
            this.logger.warn(`Email ${createUserDto.email} is already taken`);
            return state_1.State.builder().forError('Email is already taken');
        }
        try {
            const createdUser = new this.userModel(createUserDto);
            this.logger.log(`User ${createUserDto.email} created successfully`);
            return state_1.State.builder().forSuccess(this.buildUserResponse(await createdUser.save()));
        }
        catch (error) {
            this.logger.error('Error creating user:', error);
            return state_1.State.builder().forError('Internal Server Error');
        }
    }
    async loginUser(loginDto) {
        this.logger.log(`Logging in user ${loginDto.email}`);
        const user = await this.userModel
            .findOne({ email: loginDto.email })
            .select('+password');
        if (!user) {
            this.logger.warn(`User ${loginDto.email} not found`);
            return state_1.State.builder().forError('User not found');
        }
        const isPasswordCorrect = await (0, bcrypt_1.compare)(loginDto.password, user.password);
        if (!isPasswordCorrect) {
            this.logger.warn(`Incorrect password for user ${loginDto.email}`);
            return state_1.State.builder().forError('Incorrect password');
        }
        this.logger.log(`User ${loginDto.email} logged in successfully`);
        return state_1.State.builder().forSuccess(this.buildUserResponse(user));
    }
    buildUserResponse(userEntity, token) {
        return {
            name: userEntity.name,
            email: userEntity.email,
            token: token ?? this.generateJwt(userEntity),
            createdAt: userEntity.createdAt,
        };
    }
    generateJwt(userEntity) {
        return (0, jsonwebtoken_1.sign)({ email: userEntity.email }, this.configService.get('JWT_SECRET'), { expiresIn: this.configService.get('JWT_EXPIRATION') });
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.UserEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map
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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_service_1 = require("./user.service");
const login_dto_1 = require("./dto/login.dto");
const state_1 = require("../state/state");
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async createUser(createUserDto, res) {
        this.logger.log('Registering a new user');
        const state = await this.userService.createUser(createUserDto);
        return res.status(common_1.HttpStatus.OK).json(state);
    }
    async login(loginDto, res) {
        this.logger.log('User login attempt');
        const state = await this.userService.loginUser(loginDto);
        return res.status(common_1.HttpStatus.OK).json(state);
    }
    async currentUser(request, res) {
        this.logger.log('Fetching current user');
        if (!request.user) {
            return res
                .status(common_1.HttpStatus.OK)
                .json(state_1.State.builder().forUnauthorized('Unauthorized'));
        }
        const user = await this.userService.findByEmail(request.user.email);
        if (!user) {
            return res
                .status(common_1.HttpStatus.OK)
                .json(state_1.State.builder().forUnauthorized('Unauthorized'));
        }
        const token = request.headers['authorization'].split(' ')[1];
        return res
            .status(common_1.HttpStatus.OK)
            .json(state_1.State.builder().forSuccess(this.userService.buildUserResponse(user, token)));
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('user/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('users/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "currentUser", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthMiddleware = class AuthMiddleware {
    constructor(userService, configService) {
        this.userService = userService;
        this.configService = configService;
    }
    async use(req, res, next) {
        if (!req.headers['authorization']) {
            req.user = null;
            next();
            return;
        }
        const token = req.headers['authorization'].split(' ')[1];
        try {
            const decode = (0, jsonwebtoken_1.verify)(token, this.configService.get('JWT_SECRET'));
            const user = await this.userService.findByEmail(decode.email);
            req.user = user;
            next();
        }
        catch (err) {
            req.user = null;
            next();
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map
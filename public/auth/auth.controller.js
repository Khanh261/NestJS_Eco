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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const local_auth_guard_1 = require("./local-auth.guard");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const ResponseData_1 = require("../common/response/ResponseData");
const bcrypt = require("bcrypt");
const register_dto_1 = require("./dto/register.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req) {
        try {
            const data = await this.authService.login(req.user);
            return new ResponseData_1.ResponseData(common_1.HttpStatus.OK, data, 'Login success');
        }
        catch (error) {
            console.log('Rrror login controller: ', error);
        }
    }
    async getProfile(req) {
        if (!req.user) {
            throw new common_1.HttpException('User not found in request', common_1.HttpStatus.UNAUTHORIZED);
        }
        const { id } = req.user;
        console.log('get profile user -------');
        const data = await this.authService.showUser(id);
        return data;
    }
    async register(registationData) {
        console.log('register data: ', registationData);
        const hashedPassword = await bcrypt.hash(registationData.password, 10);
        try {
            const createUser = await this.authService.create({
                ...registationData,
                password: hashedPassword,
            });
            return new ResponseData_1.ResponseData(common_1.HttpStatus.OK, createUser, 'Register success');
        }
        catch (error) {
            console.log('error register controller: ', error);
            return new ResponseData_1.ResponseData(error.status, error.response, 'error');
        }
    }
    async refreshToken({ refresh_token }) {
        if (!refresh_token) {
            throw new common_1.BadRequestException('refresh token is required');
        }
        const user = this.authService.verifyRefreshToken(refresh_token);
        if (!user) {
            throw new common_1.BadRequestException('Invalid refresh token');
        }
        return this.authService.login(user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../frontend/user/user.service");
const bcrypt = require("bcrypt");
const constants_1 = require("./constants");
const moment = require("moment");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        const user = await this.userService.findOneByUsername(username);
        if (!user)
            return null;
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword)
            return null;
        const plainUser = { ...user };
        delete plainUser.password;
        return plainUser;
    }
    async login(user) {
        console.log('---------Auth Service Login: ', user);
        const payload = { username: user.username, sub: user.id };
        const refresh_token = this.jwtService.sign(payload, {
            expiresIn: constants_1.EXPIRES_TIME,
        });
        this.userService.saveRefreshToken(refresh_token, user.id);
        const expiresTime = 100;
        const { password, ...safeUser } = user;
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: refresh_token,
            user: safeUser,
            expires_in: moment().add(expiresTime, 'days'),
        };
    }
    async showUser(id) {
        return await this.userService.findById(id);
    }
    async create(userDto) {
        const checkUsername = await this.userService.findOneByUsername(userDto.phone);
        if (checkUsername) {
            throw new common_1.HttpException('Phone number already exists ${userDto.phone}', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const checkEmail = await this.userService.findOneByUsername(userDto.email);
        if (checkEmail) {
            throw new common_1.HttpException('Email already exists ${userDto.email}', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const checkPhone = await this.userService.findOneByUsername(userDto.phone);
        if (checkPhone) {
            throw new common_1.HttpException('Phone number already exists ${userDto.phone}', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const user = await this.userService.register(userDto);
        if (user) {
            return this.login(user);
        }
        throw new common_1.HttpException('Error when create user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async verifyRefreshToken(refresh_token) {
        const decode_token = this.jwtService.decode(refresh_token);
        if (decode_token) {
            const user = await this.userService.verifyRefreshToken(refresh_token, decode_token.sub);
            if (user) {
                return user;
            }
        }
        return false;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
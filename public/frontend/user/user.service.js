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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    async findOneByUsername(username) {
        return this.usertRepository.findOne({
            where: { username },
        });
    }
    async findById(id) {
        return await this.usertRepository.findOne({
            where: {
                id: id,
            },
        });
    }
    async updateInfo(id, updateUser) {
        await this.usertRepository.update(id, updateUser);
        return await this.findById(id);
    }
    async updateEmail(id, updateEmail) {
        const user = await this.findById(id);
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const checkEmail = await this.usertRepository.findOne({
            where: {
                email: updateEmail.email,
                id: (0, typeorm_2.Not)(id),
            },
        });
        if (checkEmail) {
            throw new common_1.HttpException(`Email ${updateEmail.email} already exists`, common_1.HttpStatus.BAD_REQUEST);
        }
        user.email = updateEmail.email;
        await this.usertRepository.update(id, user);
        return await this.findById(id);
    }
    async updatePassword(id, updatePassword) {
        const user = await this.findById(id);
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const isMatch = await bcrypt.compare(updatePassword.password, user.password);
        if (!isMatch) {
            throw new common_1.HttpException('Current password is incorrect', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(updatePassword.password, 10);
        user.password = hashedPassword;
        await this.usertRepository.update(id, user);
        return await this.findById(id);
    }
    async updatePhone(id, updatePhone) {
        const user = await this.findById(id);
        const checkPhone = await this.usertRepository.findOne({
            where: {
                phone: updatePhone.phone,
                id: (0, typeorm_2.Not)(id),
            },
        });
        if (checkPhone) {
            throw new common_1.HttpException('Phone number already exists ${updatePhone.phone}', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        user.phone = updatePhone.phone;
        await this.usertRepository.update(id, user);
        return await this.findById(id);
    }
    async register(userRegister) {
        const newData = await this.usertRepository.create(userRegister);
        return await this.usertRepository.save(newData);
    }
    async saveRefreshToken(refreshToken, id) {
        const user = await this.findById(id);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        user.refresh_token = hashedRefreshToken;
        return this.usertRepository.save(user);
    }
    async verifyRefreshToken(refresh_token, id) {
        const user = await this.usertRepository.findOne({
            where: {
                id: id,
            },
        });
        if (user) {
            const status = await bcrypt.compare(refresh_token, user.refresh_token);
            if (status) {
                return user;
            }
        }
        return false;
    }
    async findByEmail(email) {
        return await this.usertRepository.findOne({
            where: {
                email: email,
            },
        });
    }
    async findByUsername(username) {
        return await this.usertRepository.findOne({
            where: {
                username: username,
            },
        });
    }
    async findByPhone(phone) {
        return await this.usertRepository.findOne({
            where: {
                phone: phone,
            },
        });
    }
};
exports.UserService = UserService;
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.default),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "usertRepository", void 0);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map
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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const localFiles_interceptor_1 = require("../common/helpers/localFiles.interceptor");
const common_2 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let UploadController = class UploadController {
    uploadFile(file, response) {
        const stream = (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), file.path));
        response.set({
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Content-Type': file.mimetype,
        });
        return new common_2.StreamableFile(stream);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('file'),
    (0, common_1.UseInterceptors)((0, localFiles_interceptor_1.default)({
        fieldName: 'file',
        path: '/images',
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_2.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadFile", null);
exports.UploadController = UploadController = __decorate([
    (0, common_2.Controller)('upload')
], UploadController);
//# sourceMappingURL=upload.controller.js.map
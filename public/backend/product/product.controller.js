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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_service_1 = require("./product.service");
const Paging_1 = require("../../common/response/Paging");
const ResponseData_1 = require("../../common/response/ResponseData");
const CreateProduct_dto_1 = require("../category/dto/CreateProduct.dto");
const UpdateProduct_dts_1 = require("../category/dto/UpdateProduct.dts");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getListProduct(request) {
        const paging = {
            page: request.query.page || 1,
            page_size: request.query.page_size || 10,
        };
        const filter = {
            p_name: request.query.pro_name || ' ',
        };
        const response = await this.productService.getListProduct(paging, filter);
        const [data, total] = response;
        const pagingData = new Paging_1.default(Number(paging.page), Number(paging.page_size), total);
        return new ResponseData_1.ResponseData(common_1.HttpStatus.OK, data, 'success', pagingData);
    }
    async store(createProductDto) {
        const data = await this.productService.store(createProductDto);
        return new ResponseData_1.ResponseData(common_1.HttpStatus.OK, data, 'add product success');
    }
    async show(id) {
        const data = await this.productService.show(id);
        return new ResponseData_1.ResponseData(common_1.HttpStatus.OK, data);
    }
    async update(updateProductDto, id) {
        const response = await this.productService.update(id, updateProductDto);
        return new ResponseData_1.ResponseData(common_1.HttpStatus.OK, response, 'update product success');
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)('lists'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getListProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('store'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProduct_dto_1.default]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "store", null);
__decorate([
    (0, common_1.Get)('show/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "show", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateProduct_dts_1.default, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('cms/product'),
    (0, swagger_1.ApiTags)('BE / Product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map
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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../../entities/category.entity");
const typeorm_2 = require("typeorm");
let CategoryService = class CategoryService {
    async getListCategory(paging, filters) {
        let condition = {};
        if (filters.hot)
            condition.c_hot = filters.hot;
        if (filters.status)
            condition.c_status = filters.status;
        return await this.categoryRepository.findAndCount({
            where: condition,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size,
        });
    }
    async store(createCategoryDto) {
        const newCategory = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(newCategory);
    }
    async show(id) {
        return await this.categoryRepository.findOne({
            where: {
                id: id,
            },
        });
    }
    async update(id, categoryDto) {
        await this.categoryRepository.update(id, categoryDto);
        return await this.show(id);
    }
};
exports.CategoryService = CategoryService;
__decorate([
    (0, typeorm_1.InjectRepository)(category_entity_1.default),
    __metadata("design:type", typeorm_2.Repository)
], CategoryService.prototype, "categoryRepository", void 0);
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)()
], CategoryService);
//# sourceMappingURL=category.service.js.map
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
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("../../entities/article.entity");
let ArticleService = class ArticleService {
    async getListArticle(paging, filter) {
        let condition = {};
        if (filter.pro_name)
            condition.pro_name = filter.pro_name;
        return await this.articleRepository.findAndCount({
            where: condition,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size,
        });
    }
    async store(createArticleDto) {
        const newArticle = this.articleRepository.create(createArticleDto);
        return await this.articleRepository.save(newArticle);
    }
    async show(id) {
        return await this.articleRepository.findOne({
            where: {
                id: id,
            },
        });
    }
    async update(id, articleDto) {
        await this.articleRepository.update(id, articleDto);
        return await this.show(id);
    }
    async delete(id) {
        const article = await this.show(id);
        if (!article) {
            throw new Error('Article not found');
        }
        await this.articleRepository.delete(id);
        return { message: 'Article deleted successfully' };
    }
    async search(query) {
        const results = await this.articleRepository.find({
            where: [
                { a_name: query },
                { a_description: query },
                { a_content: query },
            ],
        });
        return results;
    }
    async getDetailArticle(id) {
        const article = await this.articleRepository.findOne({
            where: { id: id },
        });
        if (!article) {
            throw new Error('Article not found');
        }
        return article;
    }
};
exports.ArticleService = ArticleService;
__decorate([
    (0, typeorm_1.InjectRepository)(article_entity_1.default),
    __metadata("design:type", typeorm_2.Repository)
], ArticleService.prototype, "articleRepository", void 0);
__decorate([
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleService.prototype, "show", null);
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)()
], ArticleService);
//# sourceMappingURL=article.service.js.map
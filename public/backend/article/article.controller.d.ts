import { Request } from 'express';
import { ResponseData } from 'src/common/response/ResponseData';
import { ArticleService } from './article.service';
import UpdateArticleDto from './dto/UpdateArticle.dts';
import CreateArticleDto from './dto/CreateArticle.dto';
export declare class ArticleController {
    private articleService;
    constructor(articleService: ArticleService);
    getListArticle(request: Request): Promise<ResponseData>;
    store(createArticleDto: CreateArticleDto): Promise<ResponseData>;
    show(id: number): Promise<ResponseData>;
    update(updatePArticleDto: UpdateArticleDto, id: number): Promise<ResponseData>;
    delete(id: number): Promise<ResponseData>;
    search(request: Request): Promise<ResponseData>;
    getDetailArticle(id: number): Promise<ResponseData>;
}

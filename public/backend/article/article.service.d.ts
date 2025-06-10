import CreateArticleDto from './dto/CreateArticle.dto';
import UpdateArticleDto from './dto/UpdateArticle.dts';
import ArticleEntity from 'src/entities/article.entity';
export declare class ArticleService {
    private articleRepository;
    getListArticle(paging: any, filter: any): Promise<[ArticleEntity[], number]>;
    store(createArticleDto: CreateArticleDto): Promise<ArticleEntity>;
    show(id: number): Promise<ArticleEntity>;
    update(id: number, articleDto: UpdateArticleDto): Promise<ArticleEntity>;
    delete(id: number): Promise<{
        message: string;
    }>;
    search(query: string): Promise<ArticleEntity[]>;
    getDetailArticle(id: number): Promise<ArticleEntity>;
}

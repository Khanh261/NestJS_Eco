import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateArticleDto from './dto/CreateArticle.dto';
import UpdateArticleDto from './dto/UpdateArticle.dts';
import ArticleEntity from 'src/entities/article.entity';

@Injectable()
export class ArticleService {
  @InjectRepository(ArticleEntity)
  private articleRepository: Repository<ArticleEntity>;

  async getListArticle(paging: any, filter: any) {
    let condition: any = {};

    if (filter.pro_name) condition.pro_name = filter.pro_name;

    return await this.articleRepository.findAndCount({
      where: condition,
      take: paging.page_size,
      skip: (paging.page - 1) * paging.page_size,
    });
  }

  async store(createArticleDto: CreateArticleDto) {
    const newArticle = this.articleRepository.create(createArticleDto);
    return await this.articleRepository.save(newArticle);
  }

  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.articleRepository.findOne({
      where: {
        id: id,
      },
    });
  }

 async update(id: number, articleDto: UpdateArticleDto) {
    await this.articleRepository.update(id, articleDto);
    return await this.show(id);
  }
}

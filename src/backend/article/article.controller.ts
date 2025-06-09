import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import Paging from 'src/common/response/Paging';
import { ResponseData } from 'src/common/response/ResponseData';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ArticleService } from './article.service';
import UpdateArticleDto from './dto/UpdateArticle.dts';
import CreateArticleDto from './dto/CreateArticle.dto';

@Controller('cms/article')
@ApiTags('BE / Article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('lists')
  async getListArticle(@Req() request: Request) {
    const paging = {
      page: request.query.page || 1,
      page_size: request.query.page_size || 10,
    };

    const filter = {
      p_name: request.query.pro_name || ' ',
    };

    const response = await this.articleService.getListArticle(paging, filter);

    const [data, total] = response;

    const pagingData = new Paging(
      Number(paging.page),
      Number(paging.page_size),
      total,
    );

    return new ResponseData(HttpStatus.OK, data, 'success', pagingData);
  }

  @UseGuards(JwtAuthGuard)
  @Post('store')
  async store(@Body() createArticleDto: CreateArticleDto) {
    const data = await this.articleService.store(createArticleDto);
    return new ResponseData(HttpStatus.OK, data, 'add article success');
  }

  @Get('show/:id')
  async show(@Param('id', ParseIntPipe) id: number) {
    const data = await this.articleService.show(id);
    return new ResponseData(HttpStatus.OK, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(
    @Body() updatePArticleDto: UpdateArticleDto,
    @Param('id') id: number,
  ) {
    const response = await this.articleService.update(id, updatePArticleDto);
    return new ResponseData(HttpStatus.OK, response, 'update article success');
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const response = await this.articleService.delete(id);
    return new ResponseData(HttpStatus.OK, response, 'Delete article success');
  }

  @Get('search')
  async search(@Req() request: Request) {
    const paging = {
      page: request.query.page || 1,
      page_size: request.query.page_size || 10,
    };

    const filter = {
      pro_name: request.query.pro_name || ' ',
    };

    const response = await this.articleService.getListArticle(paging, filter);

    const [data, total] = response;

    const pagingData = new Paging(
      Number(paging.page),
      Number(paging.page_size),
      total,
    );

    return new ResponseData(HttpStatus.OK, data, 'success', pagingData);
  }

  @Get('detail/:id')
  async getDetailArticle(@Param('id', ParseIntPipe) id: number) {
    const data = await this.articleService.getDetailArticle(id);
    return new ResponseData(HttpStatus.OK, data, 'success');
  }
}

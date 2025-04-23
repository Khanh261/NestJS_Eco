import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { CategoryService } from './category.service';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('lists')
  async getListProduct(@Req() request: Request) {
    const paging = {
      page: request.query.page || 1,
      page_size: request.query.page_size || 10,
    };

    const filter = {
      p_name: request.query.pro_name || ' ',
    };

    const response = await this.categoryService.getListProduct(paging, filter);
  }

  @Get('show/:id')
  async show() {
    // return 'show category';
  }
}

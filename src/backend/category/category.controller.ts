import {
  Body,
  Controller,
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
import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/CreateCategory.dto';
import UpdateCategoryDto from './dto/UpdateCategory.dto';
import { ResponseData } from 'src/common/response/ResponseData';
import { Request } from 'express';
import Paging from 'src/common/response/Paging';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cms/category')
@ApiTags('BE / Category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('lists')
  async getListCategory(@Req() request: Request) {
    const paging = {
      page: request.query.page || 1,
      page_size: request.query.page_size || 10,
    };

    const filters = {
      hot: request.query.hot ? parseInt(request.query.hot as string, 10) : null,
      status: request.query.status
        ? parseInt(request.query.status as string, 10)
        : null,
    };

    const response = await this.categoryService.getListCategory(
      paging,
      filters,
    );

    const [data, total] = response;

    const pagingData = new Paging(
      Number(paging.page),
      Number(paging.page_size),
      total,
    );

    return new ResponseData(HttpStatus.OK, data, 'success', pagingData);
  }

  //store
  @UseGuards(JwtAuthGuard)
  @Post('store')
  async store(@Body() createCategoryDto: CreateCategoryDto) {
    const data = await this.categoryService.store(createCategoryDto);
    return new ResponseData(HttpStatus.OK, data, 'add category success');
  }

  //show
  @Get('show/:id')
  async show(@Param('id', ParseIntPipe) id: number) {
    const data = await this.categoryService.show(id);
    return new ResponseData(HttpStatus.OK, data);
  }

  //update
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') id: number,
  ) {
    const response = await this.categoryService.update(id, updateCategoryDto);
    return new ResponseData(HttpStatus.OK, response, 'update category success');
  }
}

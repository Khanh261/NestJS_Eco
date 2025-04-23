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
import { ProductService } from './product.service';
import { Request } from 'express';
import Paging from 'src/common/response/Paging';
import { ResponseData } from 'src/common/response/ResponseData';
import CreateProductDto from '../category/dto/CreateProduct.dto';
import UpdateProductDto from '../category/dto/UpdateProduct.dts';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cms/product')
@ApiTags('BE / Product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('lists')
  async getListProduct(@Req() request: Request) {
    const paging = {
      page: request.query.page || 1,
      page_size: request.query.page_size || 10,
    };

    const filter = {
      p_name: request.query.pro_name || ' ',
    };

    const response = await this.productService.getListProduct(paging, filter);

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
  async store(@Body() createProductDto: CreateProductDto) {
    const data = await this.productService.store(createProductDto);
    return new ResponseData(HttpStatus.OK, data, 'add product success');
  }

  @Get('show/:id')
  async show(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.show(id);
    return new ResponseData(HttpStatus.OK, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: number,
  ) {
    const response = await this.productService.update(id, updateProductDto);
    return new ResponseData(HttpStatus.OK, response, 'update product success');
  }
}

import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import Paging from 'src/common/response/Paging';
import { ResponseData } from 'src/common/response/ResponseData';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}

  //get list product
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
}

import {
  Injectable,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import CreateProductDto from 'src/backend/category/dto/CreateProduct.dto';
import ProductEntity from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
@UseGuards(JwtAuthGuard)
export class ProductService {
  @InjectRepository(ProductEntity)
  private productRepository: Repository<ProductEntity>;

  //get list product
  async getListProduct(paging: any, filter: any) {
    let condition: any = {};

    if (filter.hot) condition.c_hot = filter.pro_hot;
    if (filter.status) condition.c_status = filter.pro_status;

    let soft: any = {
      id: 'ASC',
    };

    if (filter.sort) {
      let arrSort: any = filter.sort.split(',');
      if (arrSort[0] && arrSort[1]) {
        let orderBy = arrSort[1] == 'desc' ? 'DESC' : 'ASC';
        if (arrSort[0] == 'pro_sale') {
          soft = {
            pro_sale: orderBy,
          };
        }
      }
    }

    return await this.productRepository.findAndCount({
      where: condition,
      order: soft,
      take: paging.page_size,
      skip: (paging.page - 1) * paging.page_size,
    });
  }
}

import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductEntity from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import CreateProductDto from '../category/dto/CreateProduct.dto';
import UpdateProductDto from '../category/dto/UpdateProduct.dts';

@Injectable()
export class ProductService {
  @InjectRepository(ProductEntity)
  private productRepository: Repository<ProductEntity>;

  async getListProduct(paging: any, filter: any) {
    let condition: any = {};

    if (filter.pro_name) condition.pro_name = filter.pro_name;

    return await this.productRepository.findAndCount({
      where: condition,
      take: paging.page_size,
      skip: (paging.page - 1) * paging.page_size,
    });
  }

  async store(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, productDto: UpdateProductDto) {
    await this.productRepository.update(id, productDto);
    return await this.show(id);
  }
}

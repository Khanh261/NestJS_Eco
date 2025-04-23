import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CategoryEntity from 'src/entities/category.entity';

@Injectable()
export class CategoryService {
  @InjectRepository(CategoryEntity)
  private categoryRepository: Repository<CategoryEntity>;

  async getListProduct(paging: any, filter: any) {
    let condition: any = {};

    let soft: any = {
      id: 'ASC',
    };

    if (filter.c_name) condition.c_name = filter.c_name;
    if (filter.c_hot) condition.c_hot = filter.c_hot;

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
    return await this.categoryRepository.findAndCount({
      where: condition,
      order: soft,
      take: paging.page_size,
      skip: (paging.page - 1) * paging.page_size,
    });
  }
}

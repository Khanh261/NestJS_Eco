import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryEntity from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import CreateCategoryDto from './dto/CreateCategory.dto';
import UpdateCategoryDto from './dto/UpdateCategory.dto';

@Injectable()
export class CategoryService {
  @InjectRepository(CategoryEntity)
  private categoryRepository: Repository<CategoryEntity>;

  async getListCategory(paging: any, filters: any) {
    let condition: any = {};

    if (filters.hot) condition.c_hot = filters.hot;
    if (filters.status) condition.c_status = filters.status;

    return await this.categoryRepository.findAndCount({
      where: condition,
      take: paging.page_size,
      skip: (paging.page - 1) * paging.page_size,
    });
}

  async store(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async show(id: number) {
    return await this.categoryRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, categoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(id, categoryDto);
    return await this.show(id);
  }
}

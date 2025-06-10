import CategoryEntity from 'src/entities/category.entity';
import CreateCategoryDto from './dto/CreateCategory.dto';
import UpdateCategoryDto from './dto/UpdateCategory.dto';
export declare class CategoryService {
    private categoryRepository;
    getListCategory(paging: any, filters: any): Promise<[CategoryEntity[], number]>;
    store(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity>;
    show(id: number): Promise<CategoryEntity>;
    update(id: number, categoryDto: UpdateCategoryDto): Promise<CategoryEntity>;
}

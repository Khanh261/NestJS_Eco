import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/CreateCategory.dto';
import UpdateCategoryDto from './dto/UpdateCategory.dto';
import { ResponseData } from 'src/common/response/ResponseData';
import { Request } from 'express';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getListCategory(request: Request): Promise<ResponseData>;
    store(createCategoryDto: CreateCategoryDto): Promise<ResponseData>;
    show(id: number): Promise<ResponseData>;
    update(updateCategoryDto: UpdateCategoryDto, id: number): Promise<ResponseData>;
}

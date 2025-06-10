import { Request } from 'express';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getListProduct(request: Request): Promise<void>;
    show(): Promise<void>;
}

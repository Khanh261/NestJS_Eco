import CategoryEntity from 'src/entities/category.entity';
export declare class CategoryService {
    private categoryRepository;
    getListProduct(paging: any, filter: any): Promise<[CategoryEntity[], number]>;
}

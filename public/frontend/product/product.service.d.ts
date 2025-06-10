import ProductEntity from 'src/entities/product.entity';
export declare class ProductService {
    private productRepository;
    getListProduct(paging: any, filter: any): Promise<[ProductEntity[], number]>;
}

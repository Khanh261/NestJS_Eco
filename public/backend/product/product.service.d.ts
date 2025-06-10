import ProductEntity from 'src/entities/product.entity';
import CreateProductDto from '../category/dto/CreateProduct.dto';
import UpdateProductDto from '../category/dto/UpdateProduct.dts';
export declare class ProductService {
    private productRepository;
    getListProduct(paging: any, filter: any): Promise<[ProductEntity[], number]>;
    store(createProductDto: CreateProductDto): Promise<ProductEntity>;
    show(id: number): Promise<ProductEntity>;
    update(id: number, productDto: UpdateProductDto): Promise<ProductEntity>;
}

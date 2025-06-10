import { ProductService } from './product.service';
import { Request } from 'express';
import { ResponseData } from 'src/common/response/ResponseData';
import CreateProductDto from '../category/dto/CreateProduct.dto';
import UpdateProductDto from '../category/dto/UpdateProduct.dts';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getListProduct(request: Request): Promise<ResponseData>;
    store(createProductDto: CreateProductDto): Promise<ResponseData>;
    show(id: number): Promise<ResponseData>;
    update(updateProductDto: UpdateProductDto, id: number): Promise<ResponseData>;
}

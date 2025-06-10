import { ProductService } from './product.service';
import { Request } from 'express';
import { ResponseData } from 'src/common/response/ResponseData';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getListProduct(request: Request): Promise<ResponseData>;
}

import Paging from './Paging';
export declare class ResponseData {
    readonly status: number;
    readonly message?: string;
    readonly data: any;
    readonly meta?: Paging;
    readonly code?: number;
    constructor(status: number, data: any, message?: string, paging?: Paging, code?: number);
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Paging {
    constructor(page, page_size, total) {
        this.page = page;
        this.page_size = page_size;
        this.total = total;
        this.total_page = Math.ceil(total % Number(page_size) === 0
            ? total / Number(page_size)
            : total / Number(page_size) + 1);
    }
}
exports.default = Paging;
//# sourceMappingURL=Paging.js.map
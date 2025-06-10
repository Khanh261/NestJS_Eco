"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseData = void 0;
class ResponseData {
    constructor(status, data, message, paging, code) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.meta = paging;
        this.code = code;
    }
}
exports.ResponseData = ResponseData;
//# sourceMappingURL=ResponseData.js.map
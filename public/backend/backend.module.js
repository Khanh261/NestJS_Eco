"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendModule = void 0;
const common_1 = require("@nestjs/common");
const product_module_1 = require("./product/product.module");
const category_module_1 = require("./category/category.module");
const menu_module_1 = require("./menu/menu.module");
const order_module_1 = require("./order/order.module");
const transaction_module_1 = require("./transaction/transaction.module");
const article_module_1 = require("./article/article.module");
const user_module_1 = require("./user/user.module");
let BackendModule = class BackendModule {
};
exports.BackendModule = BackendModule;
exports.BackendModule = BackendModule = __decorate([
    (0, common_1.Module)({
        imports: [product_module_1.ProductModule, category_module_1.CategoryModule, menu_module_1.MenuModule, order_module_1.OrderModule, transaction_module_1.TransactionModule, article_module_1.ArticleModule, user_module_1.UserModule]
    })
], BackendModule);
//# sourceMappingURL=backend.module.js.map
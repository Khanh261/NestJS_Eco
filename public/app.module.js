"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const backend_module_1 = require("./backend/backend.module");
const frontend_module_1 = require("./frontend/frontend.module");
const config_1 = require("@nestjs/config");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const upload_module_1 = require("./upload/upload.module");
const Joi = require("@hapi/joi");
const core_1 = require("@nestjs/core");
const exceptionsLogger_filter_1 = require("./utils/exceptionsLogger.filter");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            backend_module_1.BackendModule,
            frontend_module_1.FrontendModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    POSTGRES_HOST: Joi.string().required(),
                    POSTGRES_PORT: Joi.number().required(),
                    POSTGRES_USER: Joi.string().required(),
                    POSTGRES_PASSWORD: Joi.string().required(),
                    POSTGRES_DB: Joi.string().required(),
                    PORT: Joi.number(),
                    UPLOADED_FILES_DESTINATION: Joi.string().required(),
                }),
            }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            upload_module_1.UploadModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: exceptionsLogger_filter_1.ExceptionsLoggerFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
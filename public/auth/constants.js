"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPIRES_TIME = exports.JWT_SECRET_KEY = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
exports.EXPIRES_TIME = process.env.EXPIRES_TIME;
//# sourceMappingURL=constants.js.map
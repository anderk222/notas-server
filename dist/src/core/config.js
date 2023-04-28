"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const APP = {
    PORT: process.env.PORT || 4444
};
exports.APP = APP;

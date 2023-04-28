"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const core_1 = require("./core");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
exports.app = app;
app.set('PORT', core_1.APP.PORT);
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, morgan_1.default)('dev'));
app.get('/', (req, res) => {
    res.send('<h1>Holaaa</h1>');
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catrgory_1 = __importDefault(require("./routers/catrgory"));
const product_1 = __importDefault(require("./routers/product"));
const checkout_1 = __importDefault(require("./routers/checkout"));
const app = express_1.default();
const portNumber = 3000;
app.use(express_1.default.json());
app.use('/api/category', catrgory_1.default);
app.use('/api/product', product_1.default);
app.post("/api/checkout", checkout_1.default);
app.listen(portNumber);

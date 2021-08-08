"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const utils = __importStar(require("../utils/utils"));
const productRouter = express_1.default.Router();
const PRODUCT_FILE_NAME = './data/products.json';
function getProductsList() {
    const data = utils.readJsonFile(PRODUCT_FILE_NAME);
    if ('products' in data)
        return data.products;
    else
        return [];
}
function saveProductList(products) {
    utils.saveToJsonFile(PRODUCT_FILE_NAME, { products });
}
function validateProduct(product) {
    const schema = joi_1.default.object({
        id: joi_1.default.number().integer().required(),
        name: joi_1.default.string().required(),
        rawPrice: joi_1.default.number().required(),
        price: joi_1.default.number().greater(0).required(),
        code: joi_1.default.string().pattern(/[A-Z]{3}-[a-z]{3}-\d{3}/).required(),
        color: joi_1.default.string(),
        catgeoryId: joi_1.default.number().required(),
        description: joi_1.default.string(),
        stockCount: joi_1.default.number(),
        expirationDate: joi_1.default.date()
    });
    const { error } = schema.validate(product);
    if (error)
        return { valid: false, error: error.details[0].message };
    else
        return { valid: true };
}
productRouter.get("/", function (req, res) {
    const products = getProductsList();
    res.status(200).json(products);
});
productRouter.post("/", function (req, res) {
    const product = req.body;
    const { valid, error } = validateProduct(product);
    if (!valid)
        return res.status(400).send(error);
    const products = getProductsList();
    const productIndex = utils.getIndexById(products, product.id);
    if (productIndex === -1) {
        products.push(product);
        saveProductList(products);
        res.status(200).send('Done !');
    }
    else
        res.status(400).send('Failed');
});
productRouter.get("/:id", function (req, res) {
    const productId = req.params.id;
    const products = getProductsList();
    const product = utils.getItemById(products, productId);
    if (product === undefined)
        res.status(404).send('Not Found !');
    else
        res.status(200).json(product);
});
productRouter.delete("/:id", function (req, res) {
    const productId = req.params.id;
    const products = getProductsList();
    const procuctIndex = utils.getIndexById(products, productId);
    if (procuctIndex === -1)
        res.status(404).send('Not Found');
    else {
        products.splice(procuctIndex, 1);
        saveProductList(products);
        res.status(200).send('Done !');
    }
});
productRouter.put("/:id", function (req, res) {
    const newProduct = req.body;
    const { valid, error } = validateProduct(newProduct);
    if (!valid)
        return res.status(400).send(error);
    const productId = req.params.id;
    const products = getProductsList();
    const productIndex = utils.getIndexById(products, productId);
    if (productIndex === -1)
        res.status(404).send('Not Found');
    else {
        products[productIndex] = newProduct;
        saveProductList(products);
        res.status(200).send('Done !');
    }
});
exports.default = productRouter;

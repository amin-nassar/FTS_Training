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
const checkOutRouter = express_1.default.Router();
const Checkout_FILE_NAME = './data/checkouts.json';
function saveCheckoutList(checkouts) {
    utils.saveToJsonFile(Checkout_FILE_NAME, { checkouts });
}
function getCheckoutList() {
    const data = utils.readJsonFile(Checkout_FILE_NAME);
    if ('categories' in data)
        return data.categories;
    else
        return [];
}
function validateCheckout(checkout) {
    const schema = joi_1.default.object({
        id: joi_1.default.number().required(),
        date: joi_1.default.date().required(),
        products: joi_1.default.array().items(joi_1.default.object({
            productId: joi_1.default.number(),
            unitPrice: joi_1.default.number(),
            Quantity: joi_1.default.number(),
            subtotal: joi_1.default.number(),
        })),
        total: joi_1.default.number().required,
        discount: joi_1.default.number().required,
        paymentAmount: joi_1.default.number().required,
        paymentMethod: joi_1.default.string().required()
    });
    const { error } = schema.validate(checkout);
    if (error)
        return { valid: false, error: error.details[0].message };
    else
        return { valid: true };
}
checkOutRouter.post('/', function (req, res) {
    const checkout = req.body;
    const { valid, error } = validateCheckout(checkout);
    if (!valid)
        return res.status(400).send(error);
    const categories = getCheckoutList();
    const catIndex = utils.getIndexById(categories, checkout.id);
    if (catIndex === -1) {
        categories.push(checkout);
        saveCheckoutList(categories);
        return res.status(200).send('Done !');
    }
    else
        return res.status(400).send('Failed');
});
exports.default = checkOutRouter;

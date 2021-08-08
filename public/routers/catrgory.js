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
const utils = __importStar(require("../utils/utils"));
const joi_1 = __importDefault(require("joi"));
const categoryRouter = express_1.default.Router();
const CATEGORY_FILE_NAME = './data/categories.json';
function saveCategoryList(categories) {
    utils.saveToJsonFile(CATEGORY_FILE_NAME, { categories });
}
function getCategoryList() {
    const data = utils.readJsonFile(CATEGORY_FILE_NAME);
    if ('categories' in data)
        return data.categories;
    else
        return [];
}
function validateCategory(category) {
    const schema = joi_1.default.object({
        id: joi_1.default.number().integer().required(),
        name: joi_1.default.string().required()
    });
    const { error } = schema.validate(category);
    if (error)
        return { valid: false, error: error.details[0].message };
    else
        return { valid: true };
}
categoryRouter.get("/", function (req, res) {
    const categories = getCategoryList();
    res.status(200).json(categories);
});
categoryRouter.post("/", function (req, res) {
    const category = req.body;
    const { valid, error } = validateCategory(category);
    if (!valid)
        return res.status(400).send(error);
    const categories = getCategoryList();
    const catIndex = utils.getIndexById(categories, category.id);
    if (catIndex === -1) {
        categories.push(category);
        saveCategoryList(categories);
        return res.status(200).send('Done !');
    }
    else
        return res.status(400).send('Failed');
});
categoryRouter.get("/:id", function (req, res) {
    const categoryId = req.params.id;
    const categories = getCategoryList();
    const category = utils.getItemById(categories, categoryId);
    if (category === undefined)
        res.status(404).send('Not Found !');
    else
        return res.status(200).json(category);
});
categoryRouter.delete("/:id", function (req, res) {
    const categoryId = req.params.id;
    const categories = getCategoryList();
    const categoryIndex = utils.getIndexById(categories, categoryId);
    if (categoryIndex === -1)
        return res.status(404).send('Not Found');
    else {
        categories.splice(categoryIndex, 1);
        saveCategoryList(categories);
        return res.status(200).send('Done !');
    }
});
categoryRouter.put("/:id", function (req, res) {
    const newCategory = req.body;
    const { valid, error } = validateCategory(newCategory);
    if (!valid)
        return res.status(400).send(error);
    const categoryId = req.params.id;
    const categories = getCategoryList();
    ;
    const categoryIndex = utils.getIndexById(categories, categoryId);
    if (categoryIndex === -1)
        return res.status(404).send('Not Found');
    else {
        categories[categoryIndex] = newCategory;
        saveCategoryList(categories);
        return res.status(200).send('Done !');
    }
});
exports.default = categoryRouter;

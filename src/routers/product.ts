import express from 'express';
import Joi from 'joi';
import * as utils from '../utils/utils';

const productRouter = express.Router();
const PRODUCT_FILE_NAME = './data/products.json';

function getProductsList(): Product[] {
  const data = utils.readJsonFile(PRODUCT_FILE_NAME);
  if('products' in data) return data.products as Product[];
  else return [];
}

function saveProductList(products: Product[]) {
  utils.saveToJsonFile(PRODUCT_FILE_NAME, {products});
}

function validateProduct(product: Product) {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
    rawPrice: Joi.number().required(),
    price: Joi.number().greater(0).required(),
    code: Joi.string().pattern(/[A-Z]{3}-[a-z]{3}-\d{3}/).required(),
    color: Joi.string(),
    catgeoryId: Joi.number().required(),
    description: Joi.string(),
    stockCount: Joi.number(),
    expirationDate: Joi.date()
  });
  const {error} = schema.validate(product);
  if(error) return {valid: false, error: error.details[0].message}
  else return {valid: true};
}

productRouter.get("/", function(req, res) {
  const products = getProductsList();
  res.status(200).json(products);
});

productRouter.post("/", function(req, res) {
  const product:Product = req.body;
  const {valid, error} = validateProduct(product);
  if(!valid) return res.status(400).send(error);
  const products = getProductsList();
  const productIndex = utils.getIndexById(products, product.id);
  if(productIndex === -1)  {
    products.push(product);
    saveProductList(products);
    res.status(200).send('Done !');
  }
  else res.status(400).send('Failed');
});

productRouter.get("/:id", function(req, res) {
  const productId = req.params.id;
  const products = getProductsList();
  const product = utils.getItemById(products, productId);
  if(product === undefined) res.status(404).send('Not Found !');
  else res.status(200).json(product);
});

productRouter.delete("/:id", function(req, res){
  const productId = req.params.id;
  const products = getProductsList();
  const procuctIndex = utils.getIndexById(products, productId);
  if(procuctIndex === -1) res.status(404).send('Not Found');
  else {
    products.splice(procuctIndex, 1);
    saveProductList(products);
    res.status(200).send('Done !');
  }
});
productRouter.put("/:id", function(req, res) {
  const newProduct:Product = req.body;
  const {valid, error} = validateProduct(newProduct);
  if(!valid) return res.status(400).send(error);
  const productId = req.params.id;
  const products = getProductsList();
  const productIndex = utils.getIndexById(products, productId);
  if(productIndex === -1) res.status(404).send('Not Found');
  else {
    products[productIndex] = newProduct;
    saveProductList(products);
    res.status(200).send('Done !');
  }
});

export default productRouter;
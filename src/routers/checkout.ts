import express from 'express';
import Joi from 'joi';
import * as utils from '../utils/utils';

const checkOutRouter = express.Router();
const Checkout_FILE_NAME = './data/checkouts.json';


function saveCheckoutList(checkouts: Checkout[]) {
  utils.saveToJsonFile(Checkout_FILE_NAME, {checkouts});
}

function getCheckoutList() : Checkout[]{
  const data = utils.readJsonFile(Checkout_FILE_NAME);
  if('categories' in data) return data.categories as Checkout[];
  else return [];
}

function validateCheckout(checkout: Checkout) {
  const schema = Joi.object({
    id: Joi.number().required(),
    date: Joi.date().required(),
    products: Joi.array().items(
      Joi.object({
        productId: Joi.number(),
        unitPrice: Joi.number(),
        Quantity: Joi.number(),
        subtotal: Joi.number(),
      })
    ),
    total:  Joi.number().required,
    discount: Joi.number().required,
    paymentAmount: Joi.number().required,
    paymentMethod: Joi.string().required()
  });

  const { error } = schema.validate(checkout);
if(error) return {valid: false, error: error.details[0].message};
else return {valid: true};
}

checkOutRouter.post('/', function (req, res) {
  const checkout:Checkout = req.body;
  const {valid, error} = validateCheckout(checkout);
  if(!valid) return res.status(400).send(error);
  const categories = getCheckoutList(); 
  const catIndex = utils.getIndexById(categories, checkout.id);
  if(catIndex === -1)  {
    categories.push(checkout);
    saveCheckoutList(categories);
    return res.status(200).send('Done !');
  }
  else return res.status(400).send('Failed');
});
export default checkOutRouter;
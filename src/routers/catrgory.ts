import express from 'express';
import * as utils from '../utils/utils';
import Joi, { valid } from 'joi';

const categoryRouter = express.Router();
const CATEGORY_FILE_NAME:string = './data/categories.json';

function saveCategoryList(categories: Category[]) {
  utils.saveToJsonFile(CATEGORY_FILE_NAME, {categories});
}

function getCategoryList() : Category[]{
  const data = utils.readJsonFile(CATEGORY_FILE_NAME);
  if('categories' in data) return data.categories as Category[];
  else return [];
}


function validateCategory(category: Category) : ValidationResult{
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required()
});

const { error } = schema.validate(category);
if(error) return {valid: false, error: error.details[0].message};
else return {valid: true};
}


categoryRouter.get("/", function (req, res) {
  const categories = getCategoryList(); 
  res.status(200).json(categories);
});

categoryRouter.post<"/",{},{},Category>("/", function(req, res){
  const category:Category = req.body;
  const {valid, error} = validateCategory(category);
  if(!valid) return res.status(400).send(error);
  const categories = getCategoryList(); 
  const catIndex = utils.getIndexById(categories, category.id);
  if(catIndex === -1)  {
    categories.push(category);
    saveCategoryList(categories);
    return res.status(200).send('Done !');
  }
  else return res.status(400).send('Failed');
});

categoryRouter.get("/:id", function(req, res) {
  const categoryId = req.params.id;
  const categories = getCategoryList();
  const category = utils.getItemById(categories, categoryId);
  if(category === undefined) res.status(404).send('Not Found !');
  else return res.status(200).json(category);
});

categoryRouter.delete("/:id", function(req, res) {
  const categoryId = req.params.id;
  const categories = getCategoryList();
  const categoryIndex = utils.getIndexById(categories, categoryId);
  if(categoryIndex === -1) return res.status(404).send('Not Found');
  else {
    categories.splice(categoryIndex, 1);
    saveCategoryList(categories);
    return res.status(200).send('Done !');
  }
});

categoryRouter.put("/:id", function(req, res) {
  const newCategory:Category = req.body;
  const {valid, error} = validateCategory(newCategory);
  if(!valid) return res.status(400).send(error);
  const categoryId = req.params.id;
  const categories = getCategoryList();;
  const categoryIndex = utils.getIndexById(categories, categoryId);
  if(categoryIndex === -1) return res.status(404).send('Not Found');
  else {
    categories[categoryIndex] = newCategory;
    saveCategoryList(categories);
    return res.status(200).send('Done !');
  }
});

export default categoryRouter;
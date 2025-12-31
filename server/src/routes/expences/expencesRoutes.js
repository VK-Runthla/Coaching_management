const express = require('express');
const {addExpenceCategory, updateExpanceCategory, deleteExpanceCategory, getExpenceCategory } = require('../../controllers/expences/category');
const { addExpence, getExpence, updateExpance, deleteExpance } = require('../../controllers/expences/expences');
const expenceRouter = express.Router();

expenceRouter.post("/addCategory",addExpenceCategory);
expenceRouter.get("/getCategories",getExpenceCategory);
expenceRouter.patch("/updateCategory/:id",updateExpanceCategory);
expenceRouter.delete("/deleteCategory/:id",deleteExpanceCategory);


expenceRouter.post("/addExpence",addExpence);
expenceRouter.get("/getExpence",getExpence);
expenceRouter.patch("/updateExpence/:id",updateExpance);
expenceRouter.delete("/deleteExpence/:id",deleteExpance);


module.exports = expenceRouter
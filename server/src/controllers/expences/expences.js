const mongoose = require("mongoose");
const expenceModel = require("../../models/expences/expenceModel");
const categoryModel = require("../../models/expences/categoryModel");

const addExpence = async (req, res) => {
  try {
    const {title,amount,referenceBy,date,paymentMode,category,description} = req.body;
    if (category) {
      const checkCategory = await categoryModel.findById(category);
      if (!checkCategory) {
        return res.send({ status: 0, msg: "Category not available" });
      }
    }
    if (!title && !amount && !referenceBy && !date && !paymentMode && !category && !description) {
      return res.send({ status: 0, msg: "All fields are required!" });
    }
    const newExpence = await new expenceModel({
      title,
      amount,
      referenceBy,
      date,
      paymentMode,
      category,
      description,
    });
    newExpence.save();

    res.send({ status: 1, msg: "Expence saved successfully" });
  } catch (error) {
    res.send({ status: 0, msg: "Internal server error", error });
  }
};

const getExpence = async (req, res) => {
  try {
    const expence = await expenceModel.aggregate([
      {
        $lookup: {
          from: "expencecategories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $project: {
          title: 1,
          amount: 1,
          date: 1,
          categoryName: "$category.name",
        },
      },
    ]);
    res.send({ expence, status: 1 });
  } catch (error) {
    res.send({ status: 0, msg: "Internal server error", error });
  }
};

const updateExpance = async(req,res)=>{
    try {
        const { id } = req.params
        const {title,amount,referenceBy,date,paymentMode,category,description} = req.body;
        const updatedFields = {};
        if(title){
            updatedFields.title = title
        }
        if(amount){
            updatedFields.amount = amount
        }
        if(referenceBy){
            updatedFields.referenceBy = referenceBy
        }
        if(date){
            updatedFields.date = date
        }
        if(paymentMode){
            updatedFields.paymentMode = paymentMode
        }
        if(category){
            updatedFields.category = category
        }
        if(description){
            updatedFields.description = description
        }
        const updatedExpence = await expenceModel.findByIdAndUpdate(id,updatedFields,{new:true})
        res.send({status:1,msg:"Expence Updates Successfully", updatedExpence})
    } catch (error) {
        res.send({status:0, msg:"Internal server error",error})
    }
}

const deleteExpance = async(req,res)=>{
    try {
        const { id } = req.params
        if(!id){
            return res.send({status:0, msg:"Unable to Delete"});
        }
        const deletedExpence = await expenceModel.findByIdAndDelete(id)
        res.send({status:1,msg:"Expence Deleted Successfully", deletedExpence})
    } catch (error) {
        res.send({status:0, msg:"Internal server error",error})
    }
}

module.exports = { addExpence, getExpence, updateExpance, deleteExpance };

const mongoose = require('mongoose');
const categoryModel = require('../../models/expences/categoryModel');

const addExpenceCategory = async(req, res)=>{
    try {
        const {name} = req.body;
        if(!name){
            return res.send({status:0, msg:"please enter category"});
        }
        const newCategory = await new categoryModel({name})
        await newCategory.save();
        res.send({status:1,msg:"Category added successfully", newCategory});
    } catch (error) {
        res.send({status:0, msg:"Internal server error",error})
    }
}

const getExpenceCategory = async(req, res)=>{
    try {
        const categories = await categoryModel.find();
        res.send({status:1,msg:"Categories Fetched", categories});
    } catch (error) {
        res.send({status:0, msg:"Internal server error",error})
    }
}


const updateExpanceCategory = async(req,res)=>{
    try {
        const { id } = req.params
        const {name} = req.body;
        if(!name && !id){
            return res.send({status:0, msg:"Unable to update"});
        }
        const updatedCategory = await categoryModel.findByIdAndUpdate(id,{name},{new:true})
        res.send({status:1,msg:"Category Updates Successfully", updatedCategory})
    } catch (error) {
        res.send({status:0, msg:"Internal server error",error})
    }
}

const deleteExpanceCategory = async(req,res)=>{
    try {
        const { id } = req.params
        if(!id){
            return res.send({status:0, msg:"Unable to Delete"});
        }
        const updatedCategory = await categoryModel.findByIdAndDelete(id)
        res.send({status:1,msg:"Category Deleted Successfully", updatedCategory})
    } catch (error) {
        res.send({status:0, msg:"Internal server error",error})
    }
}

module.exports = {addExpenceCategory, updateExpanceCategory, deleteExpanceCategory, getExpenceCategory}
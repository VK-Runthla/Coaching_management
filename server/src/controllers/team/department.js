const Department = require ("../../models/team/departmentModel");
const mongoose = require("mongoose");


const createDepartment = async (req, res) => {
  try {
    const { name, accesses = [] } = req.body;

    const department = await Department.create({
      name,
      accesses
    });

    res.status(201).json({
      message: "Department created successfully",
      department
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addModuleAccess = async (req, res) => {
  try {
    const { module, actions } = req.body;

    const result = await Department.updateOne(
      {
        _id: req.params.id,
        "accesses.module": { $ne: module }
      },
      {
        $push: {
          accesses: { module, actions }
        },
        $inc: { permissionsVersion: 1 }
      }
    );

    res.json({ message: "Module access added" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateModuleAccess = async (req, res) => {
  try {
    const { actions } = req.body;
    const { module } = req.params;

    await Department.updateOne(
      {
        _id: req.params.id,
        "accesses.module": module
      },
      {
        $set: {
          "accesses.$.actions": actions
        },
        $inc: { permissionsVersion: 1 }
      }
    );

    res.json({ message: "Module access updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const removeModuleAccess = async (req, res) => {
  try {
    const { module } = req.params;

    await Department.updateOne(
      { _id: req.params.id },
      {
        $pull: {
          accesses: { module }
        },
        $inc: { permissionsVersion: 1 }
      }
    );

    res.json({ message: "Module access removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createDepartment,getAllDepartments,getDepartmentById,deleteDepartment,addModuleAccess,updateModuleAccess,removeModuleAccess}
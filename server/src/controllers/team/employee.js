const Employee = require("../../models/team/employeeModel");
const Department = require("../../models/team/departmentModel");
const mongoose = require("mongoose");

exports.createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      emergencyContact,
      highestQualification,
      institutionName,
      department,
      joiningDate,
      salaryInHand,
      address,
      bankDetails
    } = req.body;

    const dept = await Department.findById(department);
    if (!dept) {
      return res.status(400).json({ message: "Invalid department" });
    }

    const employee = await Employee.create({
      name,
      email,
      contact,
      emergencyContact,
      highestQualification,
      institutionName,
      department,
      joiningDate,
      salaryInHand,
      permissionsVersion: dept.permissionsVersion,
      address,
      bankDetails
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.aggregate([
      {
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "_id",
          as: "department"
        }
      },
      { $unwind: "$department" },
      {
        $project: {
          name: 1,
          email: 1,
          contact: 1,
          department: "$department.name",
          salaryInHand: 1,
          joiningDate: 1,
          isActive: 1
        }
      }
    ]);

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
      },
      {
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "_id",
          as: "department"  
        }
      },
      { $unwind: "$department" }
    ]);

    if (!employee.length) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Employee updated",
      employee
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.changeDepartment = async (req, res) => {
  try {
    const { department } = req.body;

    const dept = await Department.findById(department);
    if (!dept) {
      return res.status(400).json({ message: "Invalid department" });
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        department,
        permissionsVersion: dept.permissionsVersion
      },
      { new: true }
    );

    res.json({
      message: "Department changed successfully",
      employee
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getEmployeePermissions = async (req, res) => {
  try {
    const permissions = await Employee.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
      },
      {
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "_id",
          as: "department"
        }
      },
      { $unwind: "$department" },
      {
        $project: {
          name: 1,
          accesses: "$department.accesses",
          permissionsVersion: {
            employee: "$permissionsVersion",
            department: "$department.permissionsVersion"
          }
        }
      }
    ]);

    res.json(permissions[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deactivateEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, {
      isActive: false
    });

    res.json({ message: "Employee deactivated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

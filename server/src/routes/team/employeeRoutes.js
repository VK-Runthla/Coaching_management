const express = require("express");
const employeeRouter = express.Router();
const employeeController = require("../../controllers/team/employee");

employeeRouter.post("/", employeeController.createEmployee);
employeeRouter.get("/", employeeController.getAllEmployees);
employeeRouter.get("/:id", employeeController.getEmployeeById);
employeeRouter.put("/:id", employeeController.updateEmployee);

employeeRouter.put("/:id/change-department", employeeController.changeDepartment);

employeeRouter.get("/:id/permissions", employeeController.getEmployeePermissions);

employeeRouter.put("/:id/deactivate", employeeController.deactivateEmployee);

module.exports = employeeRouter;

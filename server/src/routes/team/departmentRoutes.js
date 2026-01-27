const departmentRouter = require("express").Router();
const  controller = require("../../controllers/team/department");

departmentRouter.post("/", controller.createDepartment);
departmentRouter.get("/", controller.getAllDepartments);
departmentRouter.get("/:id", controller.getDepartmentById);
departmentRouter.delete("/:id", controller.deleteDepartment);

departmentRouter.post("/:id/access", controller.addModuleAccess);
departmentRouter.put("/:id/access/:module", controller.updateModuleAccess);
departmentRouter.delete("/:id/access/:module", controller.removeModuleAccess);

module.exports = departmentRouter;

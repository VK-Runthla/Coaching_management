const express = require("express");
const { getDoubt, addDoubt, updateDoubt, deleteDoubt } = require("../../controllers/supportController/support");
const upload = require("../../utilities/multer");
const supportRoute = express.Router();

supportRoute.get("/get-question",getDoubt);
supportRoute.post("/create-question",upload.single('image'),addDoubt);
supportRoute.patch("/update-question/:id",updateDoubt);
supportRoute.delete("/delete-question/:id",deleteDoubt);

module.exports = supportRoute;
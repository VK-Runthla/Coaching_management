const express = require("express");
const { getQuestion, addQuestion, updateQuestion, deleteQuestion } = require("../../controllers/supportController/support");
const upload = require("../../utilities/multer");
const supportRoute = express.Router();

supportRoute.get("/get-question",getQuestion);
supportRoute.post("/create-question",upload.single('image'),addQuestion);
supportRoute.put("/update-question",updateQuestion);
supportRoute.delete("/delete-question",deleteQuestion);

module.exports = supportRoute;
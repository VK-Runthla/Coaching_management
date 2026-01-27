const express = require("express");
const { addBatch, getBatch } = require("../../controllers/academics/batchController");
// const { addBatch, getBatch } = require("../controllers/batchController");
const batchesRoute = express.Router();


batchesRoute.get("/get-batch",getBatch)
batchesRoute.post("/add-batch",addBatch)


module.exports = batchesRoute
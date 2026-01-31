const express = require("express");
const { getBatch, addBatch, updateBatch, deActiveBatch } = require("../../controllers/academics/batchController");
const batchesRoute = express.Router();


batchesRoute.get("/get-batch",getBatch)
batchesRoute.post("/create-batch",addBatch)
batchesRoute.put("/update-batch/:id",updateBatch)
batchesRoute.patch("/deActive-batch/:id",deActiveBatch)


module.exports = batchesRoute
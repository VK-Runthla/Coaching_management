const express = require("express");
const { addBatch, getBatch } = require("../controllers/batchController");
const batchesRoute = express.Router();


batchesRoute.get("/get-batch",getBatch)
batchesRoute.post("/create-batch",addBatch)


module.exports = batchesRoute
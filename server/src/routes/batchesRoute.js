const express = require("express");
const { addBatch } = require("../controllers/batchController");
const batchesRoute = express.Router();


batchesRoute.post("/create-batch",addBatch)


module.exports = batchesRoute

const express = require("express");
const router = express.Router();
const controller = require("../controllers/Lead.controller");

router.post("/", controller.addLead);
router.get("/", controller.getLeads);
router.put("/:id", controller.updateLead);
router.delete("/:id", controller.deleteLead);

module.exports = router;
 
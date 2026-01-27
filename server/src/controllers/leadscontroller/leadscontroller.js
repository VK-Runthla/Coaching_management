const leadService = require("../services/Lead.service");

exports.addLead = async (req, res, next) => {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
};

exports.getLeads = async (req, res, next) => {
  try {
    const leads = await leadServ.getAllLeads();
    res.json({ success: true, data: leads });
  } catch (err) {
    next(err);
  }
};

exports.updateLead = async (req, res, next) => {
  try {
    const lead = await leadService.updateLead(req.params.id, req.body);
    res.json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
};

exports.deleteLead = async (req, res, next) => {
  try {
    await leadService.deleteLead(req.params.id);
    res.json({ success: true, message: "Lead Deleted" });
  } catch (err) {
    next(err);
  }
};

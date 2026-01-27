const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, lowercase: true },
    
    source: {
      type: String,
      enum: [ " Website " , " Facebook ", " Instagram ", " Google ", " Reference "],
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Interested", "Follow-up", "Converted", "Lost"],
      default: "New",
    },

    priority: {
      type: String,
      enum: [" Hot ", " Warm ", " Cold " ],
      default: " Cold ",
    },

    assignedTo: String ,
    followUpDate: Date ,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);

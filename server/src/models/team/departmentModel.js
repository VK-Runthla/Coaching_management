const mongoose = require("mongoose");

const AccessSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: true,
      trim: true
    },
    actions: {
      type: [String],
      required: true,
      default: []
    }
  },
  { _id: false }
);

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    accesses: {
      type: [AccessSchema],
      default: []
    },

    isActive: {
      type: Boolean,
      default: true
    },

    permissionsVersion: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", DepartmentSchema);

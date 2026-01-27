const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    contact: {
      type: String,
      required: true
    },

    emergencyContact: {
      type: String,
      required: true
    },

    /* ================= EDUCATION ================= */
    highestQualification: {
      type: String,
      required: true
    },

    institutionName: {
      type: String,
      required: true
    },

    /* ================= EMPLOYMENT ================= */
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "departments",
      required: true
    },

    joiningDate: {
      type: Date,
      required: true
    },

    salaryInHand: {
      type: Number,
      required: true
    },

    permissionsVersion: {
      type: Number,
      default: 1
    },

    /* ================= ADDRESS ================= */
    address: {
      residence: {
        type: String,
        required: true
      },
      district: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      pincode: {
        type: String,
        required: true
      }
    },

    /* ================= BANK DETAILS ================= */
    bankDetails: {
      accountHolderName: {
        type: String,
        required: true
      },
      accountNumber: {
        type: String,
        required: true
      },
      ifscCode: {
        type: String,
        required: true
      }
    },

    /* ================= STATUS ================= */
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("employees", employeeSchema);

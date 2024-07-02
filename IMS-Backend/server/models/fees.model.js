const { Schema, model } = require("mongoose");


const User = require("./user.model");

const feesSchema = new Schema(
  {
    student_id: {
      type: String,
      ref: "User",
      required: true
    },
    installment_no: {
      type: Number,
      required: true,
      default: 1
    },
    amount: {
      type: Number,
      required: true
    },
    payment_date: {
      type: Date,
      required: true
    },
    payment_status: {
      type: String,
      required: false,
      default: 'Pending'
    },
    payment_type: {
      type: String,
      required: true,
      maxlength: 100
    },
    receipt_no: {
      type: Number,
      required: true,
      unique: true
    },
    fees_invoice: {
      type: String,
      required: true
    },
    remarks: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

// Auto-increment for receipt_no
feesSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastFee = await this.constructor.findOne().sort({ receipt_no: -1 });
    this.receipt_no = lastFee ? lastFee.receipt_no + 1 : 1;
  }
  next();
});

module.exports = model("Fees", feesSchema);

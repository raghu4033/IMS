const { Schema, model } = require("mongoose");

const feesSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    installmentNumber: {
      type: Number,
      required: true,
      default: 1,
    },
    feesAmount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
      maxlength: 100,
    },
    receiptNo: {
      type: Number,
      required: true,
      unique: true,
    },
    feesInvoice: {
      type: String,
    },
  },
  { timestamps: true }
);

// Auto-increment for receipt_no
feesSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastFee = await this.constructor.findOne().sort({ receipt_no: -1 });
    this.receipt_no = lastFee ? lastFee.receipt_no + 1 : 1;
  }
  next();
});

module.exports = model("Fees", feesSchema);

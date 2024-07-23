const { Schema, model } = require("mongoose");

const otpSchema = new Schema(
    {
        otp: {
            type: Number,
            required: true,
        },
        expiresIn: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = model("Otp", otpSchema);

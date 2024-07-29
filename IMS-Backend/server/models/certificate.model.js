const { Schema, model } = require("mongoose");

const certificateeSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        certificateGrade: {
            type: String,
            required: true,
        },
        generatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = model("Certificate", certificateeSchema);

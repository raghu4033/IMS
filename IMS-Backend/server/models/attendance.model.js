const { Schema, model } = require("mongoose");

const attaendanceSchema = new Schema(
    {
        faculty: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        isPresent: {
            type: Boolean,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = model("Attendance", attaendanceSchema);

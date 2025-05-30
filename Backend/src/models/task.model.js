const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = {
    Task,
};

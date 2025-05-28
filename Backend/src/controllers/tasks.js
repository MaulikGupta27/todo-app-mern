const { Task } = require("../models/task.model");


const handleAddNewTask = async (req, res) => {
    try {
        const newTask = await Task.create({
            title: req.body.title,
            description: req.body.description,
        });
        return res.status(201).json({
            message: "Task created successfully",
            task: newTask,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const handleGetAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find(); // .find returns an array
        return res.json({ tasks: allTasks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const handleUpdateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const taskToUpdate = await Task.findByIdAndUpdate(
            id,
            { $set: { completed: req.body.completed } },
            { new: true, runValidators: true }
        );
        return res.json({ task: taskToUpdate });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const handleDeleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res
            .status(200)
            .json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    handleAddNewTask,
    handleGetAllTasks,
    handleDeleteTask,
    handleUpdateTask,
};

const express = require("express");
const {
    handleAddNewTask,
    handleGetAllTasks,
    handleDeleteTask,
    handleUpdateTask
} = require("../controllers/tasks");

const router = express.Router();

router.post("/", handleAddNewTask);
router.get("/", handleGetAllTasks);
router.put("/:id", handleUpdateTask);
router.delete("/:id", handleDeleteTask);

module.exports = {
    taskRouter: router,
};

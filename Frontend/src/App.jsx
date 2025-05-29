import axios from "axios";
import TaskInput from "./Components/TaskInput";
import TaskList from "./Components/TaskList";
import SubmitButton from "./Components/SubmitButton";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  console.log("App component loaded. API_URL is set");

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [taskList, setTaskList] = useState([]);

  // For editing
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    console.log("Fetching tasks from backend");
    axios
      .get(`${API_URL}/tasks`)
      .then((response) => {
        setTaskList(response.data.tasks);
        console.log("Tasks fetched successfully");
      })
      .catch((error) => {
        console.error("Error fetching tasks");
        const errorMsg =
          error.response?.data?.error || "Failed to fetch tasks.";
        toast.error(errorMsg);
      });
  }, []);

  const handleTaskCompleted = (taskId, currentCompleted) => {
    console.log("Updating completion for task ID", taskId);
    axios
      .put(`${API_URL}/tasks/${taskId}`, {
        completed: !currentCompleted,
      })
      .then(() => {
        console.log("Completion updated for task ID", taskId);
        setTaskList((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? { ...task, completed: !currentCompleted }
              : task
          )
        );
        toast.success("Task status updated.");
      })
      .catch((error) => {
        console.error("Error updating task completion");
        const errorMsg =
          error.response?.data?.error || "Failed to update task.";
        toast.error(errorMsg);
      });
  };

  const handleDltTask = (taskId) => {
    console.log("Deleting task ID", taskId);
    axios
      .delete(`${API_URL}/tasks/${taskId}`)
      .then(() => {
        console.log("Task deleted with ID", taskId);
        setTaskList((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
        toast.success("Task deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting task");
        const errorMsg =
          error.response?.data?.error || "Failed to delete task.";
        toast.error(errorMsg);
      });
  };

  // Start editing a task: set editing states
  const handleStartEditTask = (task) => {
    console.log("Editing started for task ID", task._id);
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // Save edited task to backend and update UI
  const handleSaveEditTask = (taskId) => {
    console.log("Saving edits for task ID", taskId);
    axios
      .put(`${API_URL}/tasks/${taskId}`, {
        title: editTitle,
        description: editDescription,
      })
      .then(() => {
        console.log("Edits saved for task ID", taskId);
        setTaskList((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? { ...task, title: editTitle, description: editDescription }
              : task
          )
        );
        setEditingTaskId(null);
        toast.success("Task updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating task");
        const errorMsg =
          error.response?.data?.error || "Failed to update task.";
        toast.error(errorMsg);
      });
  };

  // Cancel editing mode
  const handleCancelEdit = () => {
    console.log("Editing cancelled");
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  return (
    <div className="h-screen w-screen bg-white p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-blue-500 font-bold text-3xl flex flex-col items-center justify-center">
        Todo List App
      </h2>

      <div className="flex justify-center gap-4 mt-4">
        <TaskInput
          value={newTaskTitle}
          onChange={setNewTaskTitle}
          placeholder="Enter Title"
        />
        <TaskInput
          value={newTaskDescription}
          onChange={setNewTaskDescription}
          placeholder="Enter Description"
        />
      </div>

      <SubmitButton
        setTaskList={setTaskList}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskDescription={newTaskDescription}
        setNewTaskDescription={setNewTaskDescription}
      />

      <TaskList
        taskList={taskList}
        handleTaskCompleted={handleTaskCompleted}
        handleDltTask={handleDltTask}
        handleStartEditTask={handleStartEditTask}
        editingTaskId={editingTaskId}
        editTitle={editTitle}
        editDescription={editDescription}
        setEditTitle={setEditTitle}
        setEditDescription={setEditDescription}
        handleSaveEditTask={handleSaveEditTask}
        handleCancelEdit={handleCancelEdit}
      />
    </div>
  );
}

export default App;

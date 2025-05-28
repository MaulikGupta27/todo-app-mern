import axios from "axios";

function SubmitButton({
  setTaskList,
  newTaskTitle,
  setNewTaskTitle,
  newTaskDescription,
  setNewTaskDescription,
}) {
  const handleAddTask = () => {
    if (!newTaskTitle) return;

    axios
      .post("http://localhost:3000/tasks", {
        title: newTaskTitle,
        description: newTaskDescription,
      })
      .then((response) => {
        setTaskList((prevList) => [...prevList, response.data.task]); // append to task list
        setNewTaskTitle(""); // clear input field
        setNewTaskDescription(""); // clear description field
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <button
      className="bg-blue-500 text-white py-2 my-7 rounded-md w-100 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto block"
      onClick={handleAddTask}
    >
      SUBMIT
    </button>
  );
}

export default SubmitButton;

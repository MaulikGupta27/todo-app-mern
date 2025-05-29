import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


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
      .post(`${API_URL}/tasks`, {
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

import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

function TaskList({
  taskList,
  handleTaskCompleted,
  handleDltTask,
  handleStartEditTask,
  editingTaskId,
  editTitle,
  editDescription,
  setEditTitle,
  setEditDescription,
  handleSaveEditTask,
  handleCancelEdit,
}) {
  return (
    <div className="mt-6 w-full max-w-3xl mx-auto px-4">
      {taskList.length === 0 ? (
        <p className="text-center text-gray-500 font-semibold text-4xl mt-20">
          No tasks available
        </p>
      ) : (
        <>
          <h3 className="text-center text-blue-500 text-2xl font-semibold mb-6">
            Tasks
          </h3>

          <div className="grid gap-4">
            {taskList.map((task) => {
              const isEditing = editingTaskId === task._id;

              return (
                <div
                  key={task._id}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm flex items-start gap-4"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      handleTaskCompleted(task._id, task.completed)
                    }
                    className="w-5 h-5 mt-1 cursor-pointer accent-blue-500"
                    disabled={isEditing}
                  />

                  <div className="flex-1">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full mb-2 p-1 border border-gray-300 rounded"
                        />
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded"
                          rows={3}
                        />
                      </>
                    ) : (
                      <>
                        <h4
                          className={`text-lg font-medium ${
                            task.completed ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {task.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {task.description}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex gap-4">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleSaveEditTask(task._id)}
                          className="text-green-600 font-semibold hover:underline cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-red-600 font-semibold hover:underline cursor-pointer"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <PencilIcon
                          className="w-5 h-5 text-blue-400 cursor-pointer"
                          onClick={() => handleStartEditTask(task)}
                        />
                        <TrashIcon
                          className="w-5 h-5 text-red-500 cursor-pointer"
                          onClick={() => handleDltTask(task._id)}
                        />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default TaskList;

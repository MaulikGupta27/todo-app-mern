function TaskInput({ value, onChange, placeholder }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <input
        type="text"
        className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default TaskInput;
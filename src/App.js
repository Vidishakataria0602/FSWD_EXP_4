import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = () => {
    if (input.trim() === "") return;

    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = input;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, input]);
    }

    setInput("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setInput(tasks[index]);
    setEditingIndex(index);
  };

  const completeTask = (index) => {
    setCompletedTasks([...completedTasks, tasks[index]]);
    deleteTask(index);
  };

  return (
    <div className="container">
      <h2>My To-Do List</h2>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addTask}>{editingIndex !== null ? "Update" : "Add"}</button>
      </div>

      <h3>Pending Tasks</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <div>
              <button className="complete" onClick={() => completeTask(index)}>✔</button>
              <button className="edit" onClick={() => editTask(index)}>✏</button>
              <button className="delete" onClick={() => deleteTask(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Completed Tasks</h3>
      <ul className="completed-list">
        {completedTasks.map((task, index) => (
          <li key={index} className="completed">
            <s>{task}</s>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


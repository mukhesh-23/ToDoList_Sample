import React, { useState } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (task.trim() === "" || date.trim() === "" || time.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = tasks.map((t, index) =>
        index === editIndex ? { ...t, text: task, date, time } : t
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([
        ...tasks,
        { text: task, date, time, completed: false, reminderSet: false },
      ]);
    }

    setTask("");
    setDate("");
    setTime("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setDate(tasks[index].date);
    setTime(tasks[index].time);
    setEditIndex(index);
  };

  const setReminder = (taskIndex) => {
    const task = tasks[taskIndex];
    const reminderTime = new Date(`${task.date}T${task.time}`).getTime();
    const now = new Date().getTime();

    if (reminderTime > now) {
      setTimeout(() => {
        alert(`Reminder: ${task.text}`);
      }, reminderTime - now);

      const updatedTasks = tasks.map((t, index) =>
        index === taskIndex ? { ...t, reminderSet: true } : t
      );
      setTasks(updatedTasks);
    } else {
      alert("Cannot set a reminder for a past time!");
    }
  };

  return (
    <div className="todo-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={addTask}>{editIndex !== null ? "Update" : "Add"}</button>
      </div>

      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className={t.completed ? "completed" : ""}>
            <div className="task-content">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleComplete(index)}
              />
              <span>{t.text}</span>
              <p>
                {t.date} at {t.time}
              </p>
            </div>
            <div className="actions">
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
              {!t.reminderSet && (
                <button onClick={() => setReminder(index)}>Set Reminder</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

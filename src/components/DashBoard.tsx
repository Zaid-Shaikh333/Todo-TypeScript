import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import TodoList from './Todo';
const uuidv4 = require("uuid");
// import AddTodo from './AddTodo';
import '../Styles/dashboard.css';

const Dashboard: React.FunctionComponent<any> = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [showAddTodo, setShowAddTodo] = useState(false);
  const [title, setTitle] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    navigate('/login')// Redirect user to login if not authenticated
    return null;
  }

  const handleAddTodo = () => {
    if (user) {
      if (currentTaskId) {
        const task = findTaskByUuid(user.todos, currentTaskId);
        if (task) {
          const newSubtask = {
            id: task.subTasks.length + 1,
            title,
            completed: false,
            subTasks: []
          };
          task.subTasks.push(newSubtask);
          setTitle('');
        }
      } else {
        // Add new top-level task
        const newTodo = {
          id: user.todos.length + 1,
          uuid: uuidv4(),
          title,
          completed: false,
          subTasks: []
        };
        user.todos.push(newTodo);
        setTitle('');
      }
    }
  };
  

  const findTaskByUuid = (tasks: any, uuid: string | any): any => {
    for (let task of tasks) {
      if (task.uuid === uuid) {
        return task;
      } else if (task.subTasks && task.subTasks.length > 0) {
        let subTask = findTaskByUuid(task.subTasks, uuid);
        if (subTask) {
          return subTask;
        }
      }
    }
    return null;
  };
  

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name}</h2>

      <div className="button-container">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className="todo-card">
        <h3>Todos:</h3>

        <div className="todo-form">
          <input
            type="text"
            placeholder="Add new Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='todo-input'
          />
          <div className="button-container">
            <button onClick={handleAddTodo} className="add-todo-button">Add Todo</button>
          </div>
        </div>

        <ul className="todo-list">
          {user.todos.map((todo) => (
            <TodoList todo={[todo, handleAddTodo, currentTaskId, setCurrentTaskId]}/>
          ))}
        </ul>

      </div>

    </div>
  );
};

export default Dashboard;

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
// import AddTodo from './AddTodo';
import '../Styles/dashboard.css';

const Dashboard: React.FunctionComponent<any> = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [showAddTodo, setShowAddTodo] = useState(false);
  const [title, setTitle] = useState('');

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
      // Create a new todo and add it to user's todos
      const newTodo = {
        id: user.todos.length + 1,
        title,
        completed: false,
        subTasks: []
      };
      user.todos.push(newTodo);
      setTitle('');
      navigate('/dashboard')
    }
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
            <li key={todo.id}>
              <input type="checkbox" />
              <span className="todo-title">{todo.title}</span>
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
};

export default Dashboard;

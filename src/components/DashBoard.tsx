import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Dashboard: React.FunctionComponent<any> = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null; // Redirect user to login if not authenticated
  }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={handleLogout}>Logout</button>
      <h3>Todos:</h3>
      <ul>
        {user.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

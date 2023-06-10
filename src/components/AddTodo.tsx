import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const AddTodo: React.FunctionComponent<any> = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');

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
    }
  };

  return (
    <div>
      <h3>Add Todo:</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default AddTodo;

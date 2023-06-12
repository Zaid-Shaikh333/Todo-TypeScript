import React, {useState} from 'react';

const TodoList: React.FunctionComponent<any> = ({ todo, handleAddTodo, currentTaskId, setCurrentTaskId }) => {

    const handleUtility = () => {
        setCurrentTaskId(todo.uuid);
        handleAddTodo();
    }

    return (
        <li key={todo.id}>
            <input type="checkbox" />
            <span className="todo-title">{todo.title}</span>
            <button onClick={handleUtility}>Add Subtask</button>
        </li>
    )

}

export default TodoList;
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addTodo } from 'slices/todo-state/todoSlice';


export default function CreateTodoForm() {
  const [todo, setTodo] = useState<string>("");

  const dispatch = useDispatch();

  const addTask = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo) {
      dispatch(addTodo(todo));
      setTodo('')
    }
  }
  return (

    <div>
      <h1>Todo List App</h1>
      <form className="todoForm" onSubmit={addTask}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Add</button>

      </form>
    </div>
  )
}
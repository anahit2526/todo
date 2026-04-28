import React, { useState } from "react";
import "@/App.css";
import { useDispatch } from "react-redux";
import type { TodoProps } from "../../types/todo";
import { deleteTodo, editTodo } from "@slices/todo-state/todoSlice";


const TodoListItem: React.FC<TodoProps> = ({ todo }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.todo);

  return (
    <li>
      <input
        className="taskInput"
        value={isEditing ? editValue : todo.todo}
        readOnly={!isEditing}
        onChange={(e) => setEditValue(e.target.value)}
      />

      {isEditing ? (
        <button
          onClick={() => {
            dispatch(editTodo({ id: todo.id, todo: editValue }));
            setIsEditing(false);
          }}
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setEditValue(todo.todo);
          }}
        >
          Edit
        </button>
      )}

      <button onClick={() => dispatch(deleteTodo(todo.id))}>
        Delete
      </button>
    </li>
  );
};

export default TodoListItem;
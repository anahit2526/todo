import React, { useState } from "react";
import "@/App.css";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "@slices/todo-state/todoSlice";
import type { ITodo } from "@/types/todo";

type Props = {
  todo: ITodo;
};
const TodoListItem = ({ todo }: Props) => {

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  return (
    <li>
      <input
        className="taskInput"
        value={isEditing ? editValue : todo.title}
        readOnly={!isEditing}
        onChange={(e) => setEditValue(e.target.value)}
      />

      {isEditing ? (
        <button
          onClick={() => {
            dispatch(editTodo({ id: todo.id, title: editValue }));
            setIsEditing(false);
          }}
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setEditValue(todo.title);
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
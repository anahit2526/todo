import { createSlice } from "@reduxjs/toolkit";
import type { TodoState } from "./types";



const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: new Date().toISOString(),
        todo: action.payload,
        readonly: true,
        completed: true,
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, todo } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);

      if (existingTodo) {
        existingTodo.todo = todo;
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo } =
  todoSlice.actions;

export default todoSlice.reducer;

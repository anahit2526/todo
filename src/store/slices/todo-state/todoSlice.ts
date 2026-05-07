import { createSlice } from "@reduxjs/toolkit";
import type { ITodo } from "@my-types/todo";

const initialState: ITodo[] = [];

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.unshift(action.payload);
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, title } = action.payload;
      const existingTodo = state.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
      }
    },
    setTodos: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { addTodo, deleteTodo, editTodo, setTodos } = todoSlice.actions;

export default todoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { ITodo } from "@my-types/todo";
import { API } from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState: ITodo[] = [];

const fetchTodosFromAPI = async () => {
  const response = await API.get("/todos");
  return response.data;
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTodosFromAPI();
    } catch (error) {
      return rejectWithValue("error");
    }
  },
);

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
  },
  extraReducers(builder) {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;

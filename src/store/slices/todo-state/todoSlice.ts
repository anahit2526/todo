import { createSlice } from "@reduxjs/toolkit";
import type { ITodo } from "@my-types/todo";
import { API } from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const initialState: ITodo[] = [];
interface TodoState {
    todo: ITodo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
  todo: [],
  loading: false,
  error: null,
};


const fetchTodosFromAPI = async () => {
  const response = await API.get("/todos");

  return response.data;
};

export const fetchTodos = createAsyncThunk<ITodo[], void, { rejectValue: string }>(
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
      state.todo.unshift(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todo =  state.todo.filter(
        (todo) => todo.id !== action.payload
      );
    },
    editTodo: (state, action) => {
      const { id, title } = action.payload;
      const existingTodo = state.todo.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
      }
    },
  },
  extraReducers(builder) {
    builder
        .addCase(fetchTodos.fulfilled, (state,action) => {
            state.loading = false;
            state.todo = action.payload;
        })
        .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
        })
        .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || "An error occurred";
        })
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;

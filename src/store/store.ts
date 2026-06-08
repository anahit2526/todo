import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '@slices/todo-state/todoSlice';
import postReducer from './slices/post-state/postSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    post: postReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

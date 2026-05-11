import React, { useEffect } from 'react'
import TodoListItem from './TodoListItem.tsx';
import "@/App.css";
import { useDispatch, useSelector } from 'react-redux';
import type { ITodo } from '@my-types/todo.ts';
import type { AppDispatch, RootState } from '@store/store.ts';
import { fetchTodos } from '@slices/todo-state/todoSlice.ts';



const TodoList: React.FC = () => {
    const todos: ITodo[] = useSelector((state: RootState) => state.todo.todo);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (todos.length === 0) {
            dispatch(fetchTodos());
        }
    }, [todos.length, dispatch])
    return (
        <div className="container">
            {todos?.map((t) => (
                <TodoListItem key={t.id} todo={t} />
            ))}
        </div>
    )
}

export default TodoList

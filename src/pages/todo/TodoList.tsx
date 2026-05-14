import React, { useEffect } from 'react'
import TodoListItem from './TodoListItem.tsx';
import { useDispatch, useSelector } from 'react-redux';
import type { ITodo } from '@my-types/todo.ts';
import type { AppDispatch, RootState } from '@store/store.ts';
import { fetchTodos } from '@slices/todo-state/todoSlice.ts';

import "@/App.css";

const TodoList: React.FC = () => {
    const todos: ITodo[] = useSelector((state: RootState) => state.todo.todo);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch])

    return (
        <div className="container">
            <ul className="todo-list">
                {todos?.map((t) => (
                    <TodoListItem key={t.id} todo={t} />
                ))}
            </ul>
        </div>
    )
}

export default TodoList

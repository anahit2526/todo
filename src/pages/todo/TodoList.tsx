import React, { useEffect } from 'react'
import TodoListItem from './TodoListItem.tsx';
import "@/App.css";
import { useDispatch, useSelector } from 'react-redux';
import type { ITodo } from '@my-types/todo.ts';
import type { RootState } from '@store/store.ts';
import { useTodos } from '@/hooks/useTodos.ts';
import { setTodos } from '@/store/slices/todo-state/todoSlice.ts';



const TodoList: React.FC = () => {
    const todos: ITodo[] = useSelector((state: RootState) => state.todo);
    const { data, loading } = useTodos();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data.length && todos.length === 0) {
            dispatch(setTodos(data));
        }
    }, [data, dispatch])
    return (
        <div className="container">
            {todos?.map((t) => (
                <TodoListItem key={t.id} todo={t} />
            ))}
        </div>
    )
}

export default TodoList

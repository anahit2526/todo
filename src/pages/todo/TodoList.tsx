import React from 'react'
import TodoListItem from './TodoListItem.tsx';
import "./../../App.css";
import { useSelector } from 'react-redux';
import type { ITodo } from '../../types/todo.ts';
import type { RootState } from '../../store/store.ts';



const TodoList:React.FC = () => {
    const todos:ITodo[] = useSelector((state: RootState) => state.todo.todos);  
    console.log('rendering');
    
    return (
        <div className="container">
              {todos.map((t)=>(
                <TodoListItem key={t.id} todo={t}/>
             ))}
        </div>
    )
}

export default TodoList

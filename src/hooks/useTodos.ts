import { getTodos } from '@/api/todo.api';
import { useEffect, useState } from 'react';


export const useTodos = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        getTodos().then(setData).finally(()=> setLoading(false))
    },[]);
    return {data,loading};

}
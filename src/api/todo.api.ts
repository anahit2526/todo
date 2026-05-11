//api layer
import { API } from "./axios";

export const getTodos = async() => {
    const res =await API.get('/todos');
    
    return res.data;
}
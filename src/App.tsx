import "./App.css";
import CreateTodoForm from "@pages/todo/CreateTodoForm";
import TodoList from "@pages/todo/TodoList";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import CreatePostForm from "@pages/posts/CreatePostForm";

const App = () => {

  return (
    <div className="app">
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<div>home</div>} />
            <Route
              path="/todo"
              element={<div>
                <CreateTodoForm />
                <TodoList />
              </div>}
            />
            <Route path="/posts" element={<CreatePostForm />} />
            <Route path="/users" element={<div>users</div>} />
          </Routes>
        </div>
      </div>

    </div>
  );
};

export default App;

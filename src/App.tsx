import React, { lazy, Suspense } from "react";
import CreateTodoForm from "@pages/todo/CreateTodoForm";
import TodoList from "@pages/todo/TodoList";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
const CreatePostForm = lazy(() => import("@pages/posts/CreatePostForm"));
import PostsList from "./pages/posts/PostsList";

import "./App.css";

const App = () => {

  return (
    <div className="app">
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <Suspense fallback={<div>ssss</div>}>
            <Routes>
              <Route path="/" element={<div>home</div>} />
              <Route
                path="/todo"
                element={<div>
                  <CreateTodoForm />
                  <TodoList />
                </div>}
              />
              <Route path="/posts" element={<PostsList />} />
              <Route
                path="/posts/create"
                element={<CreatePostForm />}
              />
              <Route
                path="/posts/edit/:postId"
                element={<CreatePostForm />}
              />
              <Route path="/users" element={<div>users</div>} />
            </Routes>
          </Suspense>
        </div>
      </div>

    </div>
  );
};

export default App;

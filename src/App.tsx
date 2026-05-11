import "./App.css";
import CreateTodoForm from "@pages/todo/CreateTodoForm";
import TodoList from "@pages/todo/TodoList";

const App = () => {

  return (
    <div className="App">
      <CreateTodoForm />
      <TodoList />
    </div>
  );
};

export default App;

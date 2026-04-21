import "./App.css";
import { CreateTodoForm, TodoList } from "./components";

const App = () => {
  return (
    <div className="App">
      <CreateTodoForm />
      <TodoList/>
    </div>
  );
};

export default App;

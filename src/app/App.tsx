import { AddTodoForm } from "../features/add-todo/ui/AddTodoForm";
import { TodoList } from "../widgets/todos/ui/TodoList";

export const App = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#ffffff",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
      }}
    >
      <h1 style={{ color: "#0487c4", marginBottom: "24px" }}>Todo List</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
};

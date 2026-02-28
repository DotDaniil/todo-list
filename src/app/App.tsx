import { AddTodoForm } from "features";
import { TodoList } from "widgets";

export const App = () => {
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;
  return (
    <div>
      {isTouchDevice && (
        <div
          style={{ position: "absolute", top: 0, right: 0, padding: "40px" }}
        >
          Notice: To drag an element - tap it once.
        </div>
      )}
      <div
        style={{
          minHeight: "100%",
          padding: "40px",
          backgroundColor: "#ffffff",
          fontFamily: "Arial, sans-serif",
          color: "#333",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
          overflowY: "auto",
        }}
      >
        <h1 style={{ color: "#0487c4", marginBottom: "24px" }}>Todo List</h1>
        <AddTodoForm />
        <TodoList />
      </div>
    </div>
  );
};

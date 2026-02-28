import React, { useState } from "react";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { addTodo } from "../../../entities/todo/model/todoSlice";

export const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;
    dispatch(addTodo({ title }));
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "8px", marginBottom: "24px" }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#0487c4",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </form>
  );
};

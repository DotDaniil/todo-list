import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

interface TodoState {
  todos: Todo[];
}

const savedTodos = localStorage.getItem("todos");
const initialState: TodoState = {
  todos: savedTodos ? JSON.parse(savedTodos) : [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string }>) => {
      const newTodo: Todo = {
        id: uuidv4(),
        title: action.payload.title,
        completed: false,
        createdAt: Date.now(),
      };
      state.todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) todo.completed = !todo.completed;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTodo: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) todo.title = action.payload.title;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    reorderTodos: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>,
    ) => {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.todos.splice(startIndex, 1);
      state.todos.splice(endIndex, 0, removed);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, reorderTodos } =
  todoSlice.actions;
export default todoSlice.reducer;

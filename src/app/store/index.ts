import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../../entities/todo/model/todoSlice";
import filterReducer from "../../features/filter-todos/model/filterSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "entities";
import { filterReducer } from "features";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    filter: filterReducer,
  },
});

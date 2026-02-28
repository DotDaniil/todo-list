import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Filter = "all" | "completed" | "active";

interface FilterState {
  filter: Filter;
}

const savedFilter = localStorage.getItem("filter") as Filter | null;
const initialState: FilterState = { filter: savedFilter || "all" };

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
      localStorage.setItem("filter", action.payload);
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const { setFilter } = filterSlice.actions;

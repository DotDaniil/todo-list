import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { setFilter, Filter } from "../model/filterSlice";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";

export const FilterTodos: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useSelector((state: RootState) => state.filter.filter);

  const filters: Filter[] = ["all", "active", "completed"];

  return (
    <div style={{ marginBottom: "16px" }}>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => dispatch(setFilter(f))}
          style={{
            fontWeight: f === currentFilter ? "bold" : "normal",
            marginRight: "8px",
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

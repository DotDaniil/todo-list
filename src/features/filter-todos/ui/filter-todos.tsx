import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app";
import { filters, useAppDispatch } from "shared";
import { setFilter } from "../model";
import { FilterButton, FilterContainer } from "./filter-todos.styles";

export const FilterTodos: FC = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useSelector((state: RootState) => state.filter.filter);

  return (
    <FilterContainer>
      {filters.map((f) => (
        <FilterButton
          key={f}
          active={f === currentFilter}
          onClick={() => dispatch(setFilter(f))}
        >
          {f}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

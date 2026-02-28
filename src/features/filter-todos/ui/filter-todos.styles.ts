import styled from "styled-components";

export const FilterContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
`;

export const FilterButton = styled.button<{
  active?: boolean;
}>`
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#0487c4" : "#ffffff")};
  color: ${(props) => (props.active ? "#fff" : "#0487c4")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    opacity: 0.9;
  }
`;

import styled from "styled-components";

export const FilterWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
`;

export const FilterButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#0487c4" : "#ffffff")};
  color: ${(props) => (props.active ? "#fff" : "#0487c4")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition:
    background-color 0.2s,
    color 0.2s;
`;

export const EmptyMessage = styled.p`
  color: #888;
`;

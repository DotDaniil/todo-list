import styled from "styled-components";

export const SortableWrapper = styled.div<{
  isDragging: boolean;
  transform?: string;
  transition?: string;
}>`
  position: relative;
  z-index: ${(props) => (props.isDragging ? 1 : 0)};
  transform: ${(props) => props.transform || "none"};
  transition: ${(props) => props.transition || "none"};
`;

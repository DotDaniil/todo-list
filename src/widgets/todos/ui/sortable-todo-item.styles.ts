import styled from "styled-components";

export const SortableWrapper = styled.div.attrs<{
  $transform?: string;
  $transition?: string;
}>((props) => ({
  style: {
    transform: props.$transform ?? "none",
    transition: props.$transition ?? "none",
  },
}))<{
  $isDragging: boolean;
}>`
  position: relative;
  z-index: ${({ $isDragging }) => ($isDragging ? 1 : 0)};
  will-change: transform;
`;

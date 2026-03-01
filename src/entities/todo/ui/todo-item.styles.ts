import styled from "styled-components";

export const TodoContainer = styled.div<{
  $isTouch: boolean;
  $showHandle: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding: 12px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding-left: ${({ $isTouch, $showHandle }) =>
    $isTouch ? ($showHandle ? 50 : 12) : 12}px;
  transition: padding-left 0.25s;
  touch-action: ${({ $isTouch }) => ($isTouch ? "pan-y" : "auto")};
  cursor: ${({ $isTouch }) => ($isTouch ? "default" : "grab")};
`;

export const MobileHandle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  overflow: hidden;
  touch-action: none;

  span {
    display: inline-block;
    transform: translateX(0);
    transition: transform 0.25s;
    font-size: 18px;
  }
`;

export const TodoText = styled.span<{ $isTouch: boolean }>`
  flex: 1;
  min-width: 0;
  z-index: 2;
  cursor: ${({ $isTouch }) => ($isTouch ? "default" : "grab")};
`;

export const Input = styled.input`
  width: 100%;
  padding: 4px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  cursor: text;
`;

export const TodoName = styled.span<{
  $completed: boolean;
}>`
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  color: ${({ $completed }) => ($completed ? "#45d656" : "#333")};
  display: block;
  flex: 1;
  min-width: 0;
  white-space: normal;
  word-break: break-word;
`;

export const Checkbox = styled.input`
  accent-color: #45d656;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 2;
`;

export const Button = styled.button<{ $bgColor: string }>`
  background-color: ${({ $bgColor }) => $bgColor};
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  flex-shrink: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
    fill: white;
  }
`;

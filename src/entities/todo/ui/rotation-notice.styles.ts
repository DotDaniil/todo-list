import styled, { keyframes } from "styled-components";

const noticeAnimation = keyframes`
  0%   { opacity: 0; transform: translateX(-8px); }
  10%  { opacity: 1; transform: translateX(0px); }
  45%  { opacity: 1; }
  55%  { opacity: 0; transform: translateX(0px); }
  100% { opacity: 0; }
`;

export const TouchNotice = styled.div`
  position: relative;
  top: 0;
  right: 0;
  font-size: 14px;
  color: #333;
  align-content: center;
  opacity: 0;
  animation: ${noticeAnimation} 20s ease-in-out infinite;
`;

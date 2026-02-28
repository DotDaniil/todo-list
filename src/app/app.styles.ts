import styled from "styled-components";

export const AppWrapper = styled.div`
  min-height: 100%;
  padding: 40px;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
  color: #333;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Title = styled.h1`
  color: #0487c4;
  margin-bottom: 24px;
`;

export const TouchNotice = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 40px;
  font-size: 14px;
  color: #333;
`;

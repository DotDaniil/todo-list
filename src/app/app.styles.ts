import styled from "styled-components";

export const AppWrapper = styled.div`
  min-height: calc(100% - 80px);
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

  /* Chrome, Edge, Safari */
  &::-webkit-scrollbar {
    width: 0;
  }

  /* Firefox */
  scrollbar-width: none;
`;

export const Title = styled.h1`
  color: #0487c4;
  margin-bottom: 24px;
`;

export const TouchNotice = styled.div`
  position: relative;

  font-size: 14px;
  color: #333;
`;

export const TitleWithNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  gap: 8px;
  margin: 16px 0;
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  background-color: #0487c4;
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

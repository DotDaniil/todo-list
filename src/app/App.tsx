import { AddTodoForm } from "features";
import { TodoList } from "widgets";
import { isTouchDevice } from "shared";
import { AppWrapper, Title, TouchNotice } from "./app.styles";

export const App = () => {
  return (
    <div>
      {isTouchDevice && (
        <TouchNotice>Notice: To drag an element - tap it once.</TouchNotice>
      )}
      <AppWrapper>
        <Title>Todo List</Title>
        <AddTodoForm />
        <TodoList />
      </AppWrapper>
    </div>
  );
};

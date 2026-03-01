import { AddTodoForm } from "features";
import { TodoList } from "widgets";

import { AppWrapper, Title, TitleWithNotice } from "./app.styles";
import { RotatingNotice } from "entities/todo/ui/rotation-notice";
import { isTouchDevice } from "shared/utils";

export const App = () => (
  <AppWrapper>
    <TitleWithNotice $flexDirection={isTouchDevice ? "column" : "row"}>
      <Title>Todo List</Title>
      <RotatingNotice />
    </TitleWithNotice>

    <AddTodoForm />
    <TodoList />
  </AppWrapper>
);

import { useState, FC, ChangeEvent } from "react";
import { useAppDispatch } from "shared";
import { addTodo } from "entities";
import { Form, Input, Button } from "./add-todo-form.styles";

export const AddTodoForm: FC = () => {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "") return;
    dispatch(addTodo({ title }));
    setTitle("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        id="input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
      />
      <Button type="submit">Add</Button>
    </Form>
  );
};

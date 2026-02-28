import React from "react";
import { Todo } from "../../../entities/todo/model/todoSlice";
import { TodoItem } from "../../../entities/todo/ui/TodoItem";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  todo: Todo;
  isEditing: boolean;
  onEditingChange: (editing: boolean) => void;
}

export const SortableTodoItem: React.FC<Props> = ({
  todo,
  isEditing,
  onEditingChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TodoItem
        todo={todo}
        dragHandleProps={isEditing ? undefined : listeners}
        onEditingChange={onEditingChange} // прокидываем дальше
      />
    </div>
  );
};

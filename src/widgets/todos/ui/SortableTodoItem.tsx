import React from "react";
import { Todo } from "../../../entities/todo/model/todoSlice";
import { TodoItem } from "../../../entities/todo/ui/TodoItem";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  todo: Todo;
  isEditing: boolean;
  onEditingChange?: (editing: boolean) => void;
  onDragEndCleanup?: (cleanupFn: () => void) => void;
}

export const SortableTodoItem: React.FC<Props> = ({
  todo,
  isEditing,
  onEditingChange,
  onDragEndCleanup,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  console.log(isDragging ? "dragging" : "not dragging");

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, position: "relative" }}
      {...attributes}
    >
      <TodoItem
        todo={todo}
        dragHandleProps={isEditing ? undefined : listeners}
        onEditingChange={onEditingChange}
        onDragEndCleanup={onDragEndCleanup}
      />
    </div>
  );
};

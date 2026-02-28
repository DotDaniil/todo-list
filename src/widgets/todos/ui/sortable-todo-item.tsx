import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Todo, TodoItem } from "entities";

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

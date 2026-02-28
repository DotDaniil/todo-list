import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Todo, TodoItem } from "entities";
import { SortableWrapper } from "./sortable-todo-item.styles";

export type SortableTodoItemProps = {
  todo: Todo;
  isEditing: boolean;
  onEditingChange?: (editing: boolean) => void;
  onDragEndCleanup?: (cleanupFn: () => void) => void;
};

export const SortableTodoItem: React.FC<SortableTodoItemProps> = ({
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
  } = useSortable({
    id: todo.id,
  });

  const transformStyle = CSS.Transform.toString(transform);

  return (
    <SortableWrapper
      ref={setNodeRef}
      $isDragging={isDragging}
      transform={transformStyle}
      transition={transition}
      {...attributes}
    >
      <TodoItem
        todo={todo}
        dragHandleProps={isEditing ? undefined : listeners}
        onEditingChange={onEditingChange}
        onDragEndCleanup={onDragEndCleanup}
      />
    </SortableWrapper>
  );
};

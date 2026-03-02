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

export const SortableTodoItem: React.FC<SortableTodoItemProps> = React.memo(
  ({ todo, isEditing, onEditingChange, onDragEndCleanup }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: todo.id });

    const modifiedTransform =
      transform && isDragging ? { ...transform, scaleY: 1 } : transform;

    const transformStyle = CSS.Transform.toString(modifiedTransform);

    return (
      <SortableWrapper
        ref={setNodeRef}
        $isDragging={isDragging}
        $transition={transition}
        $transform={transformStyle}
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
  },
);

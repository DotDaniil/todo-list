import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { filters, useAppDispatch } from "shared";
import { reorderTodos } from "entities";
import { setFilter } from "features";
import { SortableTodoItem } from "./sortable-todo-item";
import { EmptyMessage, FilterButton, FilterWrapper } from "./todo-list.styles";

export const TodoList: React.FC = () => {
  const sensors = useSensors(useSensor(PointerSensor));
  const todos = useSelector((state: RootState) => state.todos.todos);
  const filter = useSelector((state: RootState) => state.filter.filter);
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState<string | null>(null);
  const cleanupRefs = useRef<Record<string, (() => void) | null>>({});

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const oldIndex = todos.findIndex((t) => t.id === active.id);
    const newIndex = todos.findIndex((t) => t.id === over.id);

    if (oldIndex !== newIndex) {
      dispatch(reorderTodos({ startIndex: oldIndex, endIndex: newIndex }));
    }
  };

  return (
    <div>
      <FilterWrapper>
        {filters.map((f) => (
          <FilterButton
            key={f}
            $active={f === filter}
            onClick={() => dispatch(setFilter(f))}
          >
            {f}
          </FilterButton>
        ))}
      </FilterWrapper>

      <DndContext
        autoScroll={{ threshold: { x: 0, y: 0.2 } }}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={() => {
          // NOTICE: Hides all drag and drop elements on mobile
          Object.values(cleanupRefs.current).forEach((cleanup) => cleanup?.());
        }}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={todos.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {filteredTodos.length === 0 ? (
            <EmptyMessage>No todos yet</EmptyMessage>
          ) : (
            filteredTodos.map((todo) => (
              <SortableTodoItem
                key={todo.id}
                todo={todo}
                isEditing={editingId === todo.id}
                onEditingChange={(editing) =>
                  editing ? setEditingId(todo.id) : setEditingId(null)
                }
                onDragEndCleanup={(cleanupFn) => {
                  cleanupRefs.current[todo.id] = cleanupFn;
                }}
              />
            ))
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
};

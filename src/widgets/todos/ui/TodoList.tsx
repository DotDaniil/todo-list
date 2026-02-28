import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { SortableTodoItem } from "./SortableTodoItem";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { reorderTodos } from "../../../entities/todo/model/todoSlice";

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

import {
  setFilter,
  Filter,
} from "../../../features/filter-todos/model/filterSlice";

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const filter = useSelector((state: RootState) => state.filter.filter);
  const todoRefs = useRef<(() => void)[]>([]);
  const dispatch = useAppDispatch();

  const [editingId, setEditingId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

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

  const filters: Filter[] = ["all", "active", "completed"];

  return (
    <div>
      <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => dispatch(setFilter(f))}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              backgroundColor: f === filter ? "#0487c4" : "#ffffff",
              color: f === filter ? "#fff" : "#0487c4",
              fontWeight: f === filter ? "bold" : "normal",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={() => {
          todoRefs.current.forEach((cleanup) => cleanup?.());
        }}
      >
        <SortableContext
          items={todos.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {filteredTodos.length === 0 ? (
            <p>No todos yet</p>
          ) : (
            filteredTodos.map((todo, index) => (
              <SortableTodoItem
                key={todo.id}
                todo={todo}
                isEditing={editingId === todo.id}
                onEditingChange={(editing) =>
                  editing ? setEditingId(todo.id) : setEditingId(null)
                }
                onDragEndCleanup={(cleanupFn) => {
                  todoRefs.current[index] = cleanupFn;
                }}
              />
            ))
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
};

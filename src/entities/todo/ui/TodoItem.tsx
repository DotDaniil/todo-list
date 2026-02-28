import React, { useState, useRef, useEffect } from "react";
import { Todo, toggleTodo, deleteTodo, editTodo } from "../model/todoSlice";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";

interface TodoItemProps {
  todo: Todo;
  dragHandleProps?: any;
  onEditingChange?: (editing: boolean) => void;
  onDragEndCleanup?: (fn: () => void) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  dragHandleProps,
  onEditingChange,
  onDragEndCleanup,
}) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [showHandle, setShowHandle] = useState(false);

  const hideTimerRef = useRef<number | null>(null);
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  const startEditing = () => {
    setIsEditing(true);
    onEditingChange?.(true);
  };

  const handleSave = () => {
    if (title.trim() === "") return;
    dispatch(editTodo({ id: todo.id, title }));
    setIsEditing(false);
    onEditingChange?.(false);
  };

  const handleTap = (e: React.MouseEvent) => {
    if (!isTouchDevice) return;
    e.stopPropagation();
    setShowHandle(true);

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setShowHandle(false), 3000);
  };

  const cleanupHandle = () => {
    setShowHandle(false);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (onDragEndCleanup) onDragEndCleanup(cleanupHandle);
  }, [onDragEndCleanup]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const stopDrag = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      {...(!isTouchDevice && dragHandleProps ? dragHandleProps : {})}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "8px",
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        paddingLeft: isTouchDevice ? (showHandle ? 50 : 12) : 12,
        transition: "padding-left 0.25s",
        touchAction: isTouchDevice ? "pan-y" : "auto",
        cursor: isTouchDevice ? "default" : "grab",
      }}
      onClick={isTouchDevice ? handleTap : undefined}
    >
      {!isEditing && isTouchDevice && dragHandleProps && showHandle && (
        <div
          {...dragHandleProps}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "40px",
            cursor: "grab",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
            overflow: "hidden",
            touchAction: "none",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: "translateX(0)",
              transition: "transform 0.25s",
              fontSize: "18px",
            }}
          >
            🖐🏻
          </span>
        </div>
      )}

      <span
        style={{
          flex: 1,
          minWidth: 0,
          zIndex: 2,
          cursor: !isTouchDevice ? "grab" : "default",
        }}
      >
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            onBlur={handleSave}
            autoFocus
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              cursor: "text",
            }}
          />
        ) : (
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#45d656" : "#333",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
            }}
          >
            {todo.title}
          </span>
        )}
      </span>

      <input
        type="checkbox"
        checked={todo.completed}
        onPointerDown={stopDrag}
        onClick={(e) => isTouchDevice && e.stopPropagation()}
        onChange={() => dispatch(toggleTodo({ id: todo.id }))}
        style={{
          accentColor: "#45d656",
          width: "20px",
          height: "20px",
          cursor: "pointer",
          zIndex: 2,
        }}
      />

      <button
        onPointerDown={stopDrag}
        onClick={(e) => {
          if (isTouchDevice) e.stopPropagation();
          startEditing();
        }}
        style={{
          backgroundColor: "#0487c4",
          border: "none",
          borderRadius: "6px",
          padding: "6px 10px",
          cursor: "pointer",
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
        </svg>
      </button>

      <button
        onPointerDown={stopDrag}
        onClick={(e) => {
          if (isTouchDevice) e.stopPropagation();
          dispatch(deleteTodo({ id: todo.id }));
        }}
        style={{
          backgroundColor: "#45d656",
          border: "none",
          borderRadius: "6px",
          padding: "6px 10px",
          cursor: "pointer",
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5a1 1 0 0 1-1 .5H8a1 1 0 0 1-1-.5L5 9zm5 2v8h2v-8H10zm4 0v8h2v-8h-2z" />
        </svg>
      </button>
    </div>
  );
};

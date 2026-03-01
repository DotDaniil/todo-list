import React, { useState, useRef, useEffect, FC } from "react";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  isTouchDevice,
  useAppDispatch,
  BLUE_UI_COLOR,
  PING_UI_COLOR,
} from "shared";
import { Pencil, Trash } from "./components";
import { Todo, toggleTodo, deleteTodo, editTodo } from "../model";
import {
  Button,
  Checkbox,
  Input,
  MobileHandle,
  TodoContainer,
  TodoName,
  TodoText,
} from "./todo-item.styles";

export type TodoItemProps = {
  todo: Todo;
  dragHandleProps?: SyntheticListenerMap | undefined;
  onEditingChange?: (editing: boolean) => void;
  onDragEndCleanup?: (fn: () => void) => void;
};

export const TodoItem: FC<TodoItemProps> = ({
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

  const stopDrag = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
  };

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

  const todoContainerProps = !isTouchDevice ? dragHandleProps : {};

  return (
    <TodoContainer
      {...todoContainerProps}
      $isTouch={isTouchDevice}
      $showHandle={showHandle}
      onClick={isTouchDevice ? handleTap : undefined}
      // TODO: Add long touch handler for mobile devices
    >
      {!isEditing && isTouchDevice && showHandle && (
        <MobileHandle {...dragHandleProps}>
          <span>🖐🏻</span>
        </MobileHandle>
      )}

      <TodoText $isTouch={isTouchDevice} $showHandle={showHandle}>
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            onBlur={handleSave}
            autoFocus
          />
        ) : (
          <TodoName $completed={todo.completed}>{todo.title}</TodoName>
        )}
      </TodoText>

      <Checkbox
        type="checkbox"
        checked={todo.completed}
        onPointerDown={stopDrag}
        onClick={(e) => isTouchDevice && e.stopPropagation()}
        onChange={() => dispatch(toggleTodo({ id: todo.id }))}
      />

      <Button
        $bgColor={BLUE_UI_COLOR}
        onPointerDown={stopDrag}
        onClick={(e) => {
          if (isTouchDevice) e.stopPropagation();
          startEditing();
        }}
      >
        <Pencil />
      </Button>

      <Button
        $bgColor={PING_UI_COLOR}
        onPointerDown={stopDrag}
        onClick={(e) => {
          if (isTouchDevice) e.stopPropagation();
          dispatch(deleteTodo({ id: todo.id }));
        }}
      >
        <Trash />
      </Button>
    </TodoContainer>
  );
};

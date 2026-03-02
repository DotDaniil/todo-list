import React, {
  useState,
  useRef,
  useEffect,
  FC,
  useCallback,
  memo,
} from "react";
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
  dragHandleProps?: SyntheticListenerMap;
  onEditingChange?: (editing: boolean) => void;
  onDragEndCleanup?: (fn: () => void) => void;
};

export const TodoItem: FC<TodoItemProps> = memo(
  ({ todo, dragHandleProps, onEditingChange, onDragEndCleanup }) => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [showHandle, setShowHandle] = useState(false);
    const hideTimerRef = useRef<number | null>(null);

    const stopDrag = (e: React.PointerEvent | React.MouseEvent) => {
      e.stopPropagation();
    };

    const cleanupHandle = useCallback(() => {
      setShowHandle(false);

      if (hideTimerRef.current !== null) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    }, []);

    useEffect(() => {
      onDragEndCleanup?.(cleanupHandle);
    }, []);

    useEffect(() => {
      return () => cleanupHandle();
    }, [cleanupHandle]);

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

      if (hideTimerRef.current !== null) {
        clearTimeout(hideTimerRef.current);
      }

      setShowHandle(true);

      hideTimerRef.current = window.setTimeout(() => {
        setShowHandle(false);
        hideTimerRef.current = null;
      }, 3000);
    };

    const todoContainerProps = !isTouchDevice ? dragHandleProps : {};

    return (
      <TodoContainer
        {...todoContainerProps}
        $isTouch={isTouchDevice}
        $showHandle={showHandle}
        onClick={isTouchDevice ? handleTap : undefined}
        // TODO: Add long touch handler for mobile devices
      >
        <MobileHandle
          {...dragHandleProps}
          style={{
            opacity: !isEditing && isTouchDevice && showHandle ? 1 : 0,
            pointerEvents:
              !isEditing && isTouchDevice && showHandle ? "auto" : "none",
          }}
        >
          <span>🖐🏻</span>
        </MobileHandle>

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
  },
);

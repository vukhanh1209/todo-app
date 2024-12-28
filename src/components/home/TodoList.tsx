"use client";
import TodoItem from "./TodoItem";
import { Todo } from "@/types/todo.type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import FormUpdateTodo from "./FormUpdateTodo";
import { useState } from "react";

type Props = {
  list: Todo[];
};

export default function TodoList({ list }: Props) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [todoId, setTodoId] = useState<number | null>(null);

  const handleClickTodoItem = (todo: Todo) => {
    if (todo.status === "completed") return;
    setIsUpdateModalOpen(true);
    setTodoId(todo.id);
  };
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);

  return (
    <>
      <div className="flex flex-col gap-2 px-2 pb-4">
        {list?.map((todo) => (
          <div
            key={todo.id}
            role="button"
            onClick={() => handleClickTodoItem(todo)}
          >
            <TodoItem key={todo.id} item={todo} />
          </div>
        ))}
      </div>
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="py-10">
          <DialogHeader>
            <DialogTitle>Update Todo</DialogTitle>
            <DialogDescription>
              Update the details below to modify the todo item.
            </DialogDescription>
          </DialogHeader>
          {todoId && (
            <FormUpdateTodo
              todoId={todoId}
              onSuccess={handleCloseUpdateModal}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

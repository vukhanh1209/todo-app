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
import { todo } from "node:test";

type Props = {
  list: Todo[];
};

export default function TodoList({ list }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoId, setTodoId] = useState<number | null>(null);

  const handleClickTodoItem = (todo: Todo) => {
    if (todo.status === "completed") return;
    setIsModalOpen(true);
    setTodoId(todo.id);
  };
  const handleCloseModal = () => setIsModalOpen(false);

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
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="py-10">
          <DialogHeader>
            <DialogTitle>Update Todo</DialogTitle>
            <DialogDescription>
              Update the details below to modify the todo item.
            </DialogDescription>
          </DialogHeader>
          {todoId && (
            <FormUpdateTodo todoId={todoId} onSuccess={handleCloseModal} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

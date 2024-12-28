"use client";
import { useRecoilState } from "recoil";
import { todoState } from "@/recoil/todo";
import { useEffect } from "react";
import TodoList from "./TodoList";

export default function TodoSection() {
  const [todos, setTodos] = useRecoilState(todoState);
  const inProgressItems = todos.filter((todo) => todo.status === "in_progress");
  const completedItems = todos.filter((todo) => todo.status === "completed");

  useEffect(() => {
    fetch("/api/todo")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, [setTodos]);

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-5 my-10">
      <div className="rounded-lg bg-gray-50">
        <div className="flex items-center gap-2 p-4">
          <span className="text-blue-700 bg-blue-100 rounded-lg px-2 font-medium">
            In Progress
          </span>
          <span>{inProgressItems?.length || 0}</span>
        </div>
        <TodoList list={inProgressItems} />
      </div>
      <div className="rounded-lg bg-gray-50">
        <div className="flex items-center gap-2 p-4">
          <span className="text-green-700 bg-green-100 rounded-lg px-2 font-medium">
            Completed
          </span>
          <span>{completedItems?.length || 0}</span>
        </div>
        <TodoList list={completedItems} />
      </div>
    </div>
  );
}

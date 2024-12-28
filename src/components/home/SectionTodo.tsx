"use client";
import { useRecoilState } from "recoil";
import { todoState } from "@/recoil/todo";
import { useEffect } from "react";
import TodoList from "./TodoList";
import { useSearchParams } from "next/navigation";

export default function SectionTodo() {
  const [todos, setTodos] = useRecoilState(todoState);
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";

  const filteredTodos = todos.filter((todo) => {
    if (status === "all") return true;
    return todo.status === status;
  });

  const inProgressItems = filteredTodos.filter(
    (todo) => todo.status === "in_progress"
  );
  const completedItems = filteredTodos.filter(
    (todo) => todo.status === "completed"
  );

  useEffect(() => {
    fetch("/api/todo")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, [setTodos]);

  return (
    <section className="grid grid-cols-2 gap-3 md:gap-5">
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
    </section>
  );
}

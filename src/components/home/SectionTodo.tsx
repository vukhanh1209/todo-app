"use client";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todoState } from "@/recoil/todo";
import { useEffect } from "react";
import TodoList from "./TodoList";
import { useSearchParams } from "next/navigation";
import { categoryState } from "@/recoil/category";

export default function SectionTodo() {
  const [todos, setTodos] = useRecoilState(todoState);
  const setCategories = useSetRecoilState(categoryState);
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const category = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("search") || "";

  const filteredTodos = todos.filter((todo) => {
    const statusMatch = status === "all" || todo.status === status;
    const categoryMatch =
      category === "all" || todo.categoryId?.toString() === category;
    const searchMatch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return statusMatch && categoryMatch && searchMatch;
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

    fetch("/api/category")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <section className="grid grid-cols-2 gap-3 md:gap-5">
      <div>
        <div className="rounded-lg bg-gray-50 pb-4 ">
          <div className="flex items-center gap-2 p-4 text-sm md:text-base">
            <span className="text-blue-700 bg-blue-100 rounded-lg px-2 font-medium">
              In Progress
            </span>
            <span>{inProgressItems?.length || 0}</span>
          </div>
          <TodoList list={inProgressItems} />
        </div>
      </div>
      <div>
        <div className="rounded-lg bg-gray-50 pb-4 ">
          <div className="flex items-center gap-2 p-4 text-sm md:text-base">
            <span className="text-green-700 bg-green-100 rounded-lg px-2 font-medium">
              Completed
            </span>
            <span>{completedItems?.length || 0}</span>
          </div>
          <TodoList list={completedItems} />
        </div>
      </div>
    </section>
  );
}

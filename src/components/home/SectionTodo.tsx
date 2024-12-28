"use client";
import { useEffect, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useSearchParams } from "next/navigation";
import TodoList from "./TodoList";
import { todoState } from "@/recoil/todo";
import { categoryState } from "@/recoil/category";
import { Todo } from "@/types/todo.type";
import { toast } from "sonner";

export default function SectionTodo() {
  const [todos, setTodos] = useRecoilState(todoState);
  const setCategories = useSetRecoilState(categoryState);
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "all";
  const category = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todoResponse, categoryResponse] = await Promise.all([
          fetch("/api/todo"),
          fetch("/api/category"),
        ]);

        const [todoData, categoryData] = await Promise.all([
          todoResponse.json(),
          categoryResponse.json(),
        ]);

        setTodos(todoData);
        setCategories(categoryData);
      } catch {
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [setTodos, setCategories]);

  const filteredTodos = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    return todos.filter((todo) => {
      const matchesStatus = status === "all" || todo.status === status;
      const matchesCategory =
        category === "all" || todo.categoryId?.toString() === category;
      const matchesSearch = todo.title.toLowerCase().includes(lowerCaseQuery);

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [todos, status, category, searchQuery]);

  const todoGroups = useMemo(() => {
    const groups = {
      inProgress: [] as Todo[],
      completed: [] as Todo[],
    };

    filteredTodos.forEach((todo) => {
      if (todo.status === "in_progress") {
        groups.inProgress.push(todo);
      } else if (todo.status === "completed") {
        groups.completed.push(todo);
      }
    });

    return groups;
  }, [filteredTodos]);

  const { inProgress, completed } = todoGroups;

  const renderTodoSection = (
    title: string,
    items: Todo[],
    bgColor: string,
    textColor: string
  ) => (
    <div>
      <div className="rounded-lg bg-gray-50 pb-4">
        <div className="flex items-center gap-2 p-4 text-sm md:text-base">
          <span
            className={`rounded-lg px-2 font-medium ${bgColor} ${textColor}`}
          >
            {title}
          </span>
          <span>{items?.length || 0}</span>
        </div>
        <TodoList list={items} />
      </div>
    </div>
  );

  return (
    <section className="grid grid-cols-2 gap-3 md:gap-5">
      {renderTodoSection(
        "In Progress",
        inProgress,
        "bg-blue-100",
        "text-blue-700"
      )}
      {renderTodoSection(
        "Completed",
        completed,
        "bg-green-100",
        "text-green-700"
      )}
    </section>
  );
}

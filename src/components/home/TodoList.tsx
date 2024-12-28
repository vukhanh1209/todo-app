"use client";
import { useRecoilState } from "recoil";
import { todoState } from "@/recoil/todo";
import { useEffect } from "react";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [todos, setTodos] = useRecoilState(todoState);

  useEffect(() => {
    fetch("/api/todo")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, [setTodos]);

  return (
    <div className="flex flex-col gap-4 py-10">
      {todos.map((todo) => (
        <TodoItem key={todo.id} item={todo} />
      ))}
    </div>
  );
}

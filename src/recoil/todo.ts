import { Todo } from "@/types/todo.type";
import { atom, selector } from "recoil";

export const todoState = atom<Todo[]>({
  key: "todoState",
  default: [],
});

export const todoByIdState = selector({
  key: "todoByIdState",
  get: ({ get }) => {
    const todos = get(todoState);
    return (id: number) => todos.find((todo) => todo.id === id);
  },
});

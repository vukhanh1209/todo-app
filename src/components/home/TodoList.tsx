import TodoItem from "./TodoItem";
import { Todo } from "@/types/todo.type";

type Props = {
  list: Todo[];
};

export default function TodoList({ list }: Props) {
  return (
    <div className="flex flex-col gap-2 px-2">
      {list.map((todo) => (
        <TodoItem key={todo.id} item={todo} />
      ))}
    </div>
  );
}

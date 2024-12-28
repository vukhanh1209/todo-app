import { Todo } from "@/types/todo.type";

type Props = {
  item: Todo;
};

export default function TodoItem({ item }: Props) {
  return (
    <div className="rounded-md border border-gray-300 p-3 bg-white">
      <h6 className="text-base md:text-xl font-medium">{item.title}</h6>
      <p className="line-clamp-2 text-base md:text-sm">{item.description}</p>
    </div>
  );
}

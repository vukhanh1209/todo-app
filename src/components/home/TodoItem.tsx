import { Todo } from "@/types/todo.type";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoState } from "@/recoil/todo";
import { toast } from "sonner";
import { TODO_STATUS_ENUM } from "@/enums/todo-status.enum";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/utils/cn.util";

type Props = {
  item: Todo;
};

export default function TodoItem({ item }: Props) {
  const [isChecked, setIsChecked] = useState(item.status === "completed");
  const setTodos = useSetRecoilState(todoState);

  const handleCheckboxChange = async () => {
    const newStatus = isChecked
      ? TODO_STATUS_ENUM.IN_PROGRESS
      : TODO_STATUS_ENUM.COMPLETED;
    try {
      const response = await fetch(`/api/todo/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo status");
      }

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
      setIsChecked(!isChecked);
      toast.success("Todo status updated successfully!");
    } catch {
      toast.error("Failed to update todo status.");
    }
  };
  return (
    <div
      className={cn(
        "rounded-md border border-gray-300 p-3",
        item.status === TODO_STATUS_ENUM.IN_PROGRESS &&
          "hover:bg-gray-100 transition-colors duration-200 cursor-pointer bg-white",
        item.status === TODO_STATUS_ENUM.COMPLETED &&
          "bg-gray-100 cursor-default"
      )}
    >
      <div className="flex items-center justify-between">
        <h6 className="text-sm md:text-lg font-medium truncate text-ellipsis">
          {item.title}
        </h6>
        <Checkbox
          checked={isChecked}
          onCheckedChange={handleCheckboxChange}
          className="ml-2 w-5 md:w-6 h-5 md:h-6"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <p className="line-clamp-2 text-xs md:text-sm">{item.description}</p>
    </div>
  );
}

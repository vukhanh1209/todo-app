"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { TODO_STATUS_ENUM } from "@/enums/todo-status.enum";

export default function StatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";

  const handleFilterChange = (newStatus: string) => {
    const params = new URLSearchParams(searchParams);
    if (newStatus === "all") {
      params.delete("status");
    } else {
      params.set("status", newStatus);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium text-gray-500 text-xs">Status</span>
      <Select onValueChange={handleFilterChange} defaultValue={status}>
        <SelectTrigger className="w-full md:w-fit gap-2 min-w-[100px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value={TODO_STATUS_ENUM.ALL}>
            <span className="text-gray-700 font-medium">All</span>
          </SelectItem>
          <SelectItem value={TODO_STATUS_ENUM.IN_PROGRESS}>
            <span className="text-blue-700 font-medium">In Progress</span>
          </SelectItem>
          <SelectItem value={TODO_STATUS_ENUM.COMPLETED}>
            <span className="text-green-700 font-medium">Completed</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

import CreateTodoButton from "@/components/home/CreateTodoButton";
import SectionFilters from "@/components/home/SectionFilters";
import SectionTodo from "@/components/home/SectionTodo";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="max-w-[1200px] px-6 mx-auto py-10 md:py-[100px]">
      <div className="flex justify-between items-center">
        <h1 className="text-black font-bold text-2xl md:text-3xl">Todo List</h1>
        <CreateTodoButton />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionFilters />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <SectionTodo />
      </Suspense>
    </div>
  );
}

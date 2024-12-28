import StatusFilter from "./StatusFilter";
import CategoryFilter from "./CategoryFilter";
import SearchTodo from "./SearchTodo";

export default function SectionFilters() {
  return (
    <section className="mt-10 mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-3">
      <SearchTodo />
      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <CategoryFilter />
        <StatusFilter />
      </div>
    </section>
  );
}

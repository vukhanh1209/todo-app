import StatusFilter from "./StatusFilter";
import CategoryFilter from "./CategoryFilter";

export default function SectionFilters() {
  return (
    <section className="mt-10 mb-6 flex flex-col md:flex-row md:justify-end gap-3 md:gap-4">
      <CategoryFilter />
      <StatusFilter />
    </section>
  );
}

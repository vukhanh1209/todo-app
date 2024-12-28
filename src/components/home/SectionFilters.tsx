import { Suspense } from "react";
import StatusFilter from "./StatusFilter";

export default function SectionFilters() {
  return (
    <section className="mt-10 mb-6 flex justify-end">
      <Suspense fallback={<div>Loading...</div>}>
        <StatusFilter />
      </Suspense>
    </section>
  );
}

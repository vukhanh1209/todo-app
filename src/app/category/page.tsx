import CreateCategoryButton from "@/components/category/CreateCategoryButton";
import SectionCategory from "@/components/category/SectionCategory";

export default function CategoryPage() {
  return (
    <div className="max-w-[1200px] px-6 mx-auto py-10 md:py-[100px]">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-black font-bold text-xl md:text-3xl">Categories</h1>
        <CreateCategoryButton />
      </div>
      <SectionCategory />
    </div>
  );
}

import CreateCategoryButton from "@/components/category/CreateCategoryButton";
import SectionCategory from "@/components/category/SectionCategory";
import { ArrowLeft } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route.constant";
import Link from "next/link";

export default function CategoryPage() {
  return (
    <div className="max-w-[1200px] px-6 mx-auto py-10 md:py-[100px]">
      <Link href={ROUTES.HOME}>
        <Button>
          <ArrowLeft className="h-4 w-auto" />
          Home
        </Button>
      </Link>
      <div className="flex justify-between items-center mt-5 mb-10">
        <h1 className="text-black font-bold text-xl md:text-3xl">Categories</h1>
        <CreateCategoryButton />
      </div>
      <SectionCategory />
    </div>
  );
}

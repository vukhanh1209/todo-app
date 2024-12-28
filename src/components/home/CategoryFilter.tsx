"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useRecoilValue } from "recoil";
import { categoryState } from "@/recoil/category";
import Link from "next/link";
import { ROUTES } from "@/constants/route.constant";
import { LightEditIcon } from "../icons";

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categories = useRecoilValue(categoryState);
  const category = searchParams.get("category") || "all";

  const handleFilterChange = (newCategory: string) => {
    const params = new URLSearchParams(searchParams);
    if (newCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", newCategory);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium text-gray-500 text-xs">Category</span>
      <Select onValueChange={handleFilterChange} defaultValue={category}>
        <SelectTrigger className="w-full md:w-fit min-w-[100px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
          <hr className="my-2 bg-gray-700" />
          <Link
            href={ROUTES.CATEGORY}
            className="flex items-center gap-2 w-full py-1.5 px-2 text-sm hover:bg-accent"
          >
            <LightEditIcon className="w-4 h-4 stroke-black" />
            <span>Manage category</span>
          </Link>
        </SelectContent>
      </Select>
    </div>
  );
}

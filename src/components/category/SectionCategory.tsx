"use client";
import { useRecoilState } from "recoil";
import CategoryList from "./CategoryList";
import { categoryState } from "@/recoil/category";
import { useEffect } from "react";

export default function SectionCategory() {
  const [categories, setCategories] = useRecoilState(categoryState);
  useEffect(() => {
    fetch("/api/category")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, [setCategories]);

  return (
    <section>
      <CategoryList categories={categories} />
    </section>
  );
}

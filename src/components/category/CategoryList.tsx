"use client";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { categoryState } from "@/recoil/category";
import { Category } from "@/types/category.type";
import ModalDelete from "@/components/ui-kit/ModalDelete";
import FormCategory from "./FormCategory";
import { toast } from "sonner";
import CategoryItem from "./CategoryItem";

type Props = {
  categories: Category[];
};

export default function CategoryList({ categories }: Props) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const setCategories = useSetRecoilState(categoryState);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;

    try {
      const response = await fetch(`/api/category/${selectedCategory.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== selectedCategory.id)
      );
      setIsConfirmationModalOpen(false);
      toast.success("Category deleted successfully!");
    } catch {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 px-2 pb-4">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {selectedCategory && (
        <FormCategory
          isOpen={isEditModalOpen}
          category={selectedCategory}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      <ModalDelete
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this category? This action cannot be undone."
      />
    </>
  );
}

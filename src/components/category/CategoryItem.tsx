import { Category } from "@/types/category.type";
import { Button } from "../ui/button";
import { EditIcon, TrashIcon } from "../icons";

type Props = {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export default function CategoryItem({ category, onDelete, onEdit }: Props) {
  return (
    <div className="rounded-md border border-gray-300 p-3">
      <div key={category.id} className="flex justify-between items-center">
        <span className="text-base md:text-xl font-medium truncate text-ellipsis">
          {category.name}
        </span>
        <div className="flex items-center gap-3 ml-5">
          <Button
            onClick={() => onEdit(category)}
            className="w-8 h-8 md:w-10 md:h-10"
          >
            <EditIcon className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button
            variant={"red"}
            onClick={() => onDelete(category)}
            className="w-8 h-8 md:w-10 md:h-10"
          >
            <TrashIcon className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

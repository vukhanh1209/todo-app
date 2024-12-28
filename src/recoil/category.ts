import { atom, selector } from "recoil";
import { Category } from "@/types/category.type";

export const categoryState = atom<Category[]>({
  key: "categoryState",
  default: [],
});

export const categoryByIdState = selector({
  key: "categoryByIdState",
  get: ({ get }) => {
    const categories = get(categoryState);
    return (id: number) => categories.find((category) => category.id === id);
  },
});

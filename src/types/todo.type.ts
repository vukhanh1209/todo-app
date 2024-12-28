import { Category } from "@prisma/client";
import { Status } from "./status.type";

export type Todo = {
  id: number;
  title: string;
  description: string;
  status: Status;
  category: Category;
  createdAt: string;
};

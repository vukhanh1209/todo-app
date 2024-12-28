"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSetRecoilState } from "recoil";
import { categoryState } from "@/recoil/category";
import { Category } from "@/types/category.type";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
});

type Props = {
  category?: Category;
  isOpen: boolean;
  onClose: () => void;
};

export default function FormCategory({ category, isOpen, onClose }: Props) {
  const setCategories = useSetRecoilState(categoryState);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(
        `/api/category${category ? `/${category.id}` : ""}`,
        {
          method: category ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${category ? "update" : "create"} category`);
      }

      const newCategory = await response.json();
      setCategories((prevCategories) =>
        category
          ? prevCategories.map((cat) =>
              cat.id === newCategory.id ? newCategory : cat
            )
          : [...prevCategories, newCategory]
      );
      onClose();
      toast.success(
        `Category  ${category ? "update" : "create"} successfully!`
      );
      form.reset();
    } catch {
      toast.error(`Failed to ${category ? "update" : "create"} category.`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Update Category" : "Create Category"}
          </DialogTitle>
          <DialogDescription>
            {category
              ? "Update the details below to modify the category."
              : "Fill in the details below to create a new category."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">{category ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoByIdState, todoState } from "@/recoil/todo";
import { useState } from "react";
import ModalDeleteTodo from "./ModalDeleteTodo";

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
});

type Props = {
  todoId: number;
  onSuccess: () => void;
};

export default function FormUpdateTodo({ todoId, onSuccess }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const todo = useRecoilValue(todoByIdState)(todoId);
  const setTodos = useSetRecoilState(todoState);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo?.title,
      description: todo?.description,
      category: todo?.category?.id.toString(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`/api/todo/${todo?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
      );
      toast.success("Todo updated successfully!");
      onSuccess();
    } catch {
      toast.error("Failed to update todo.");
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(`/api/todo/${todo?.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo?.id));
      toast.success("Todo deleted successfully!");
      onSuccess();
    } catch {
      toast.error("Failed to delete todo.");
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full mx-auto"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the title here"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the description here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end pt-10 gap-4">
            <Button type="submit">Update</Button>
            <Button
              type="button"
              variant={"red"}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
      <ModalDeleteTodo
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this todo? This action cannot be undone."
      />
    </>
  );
}

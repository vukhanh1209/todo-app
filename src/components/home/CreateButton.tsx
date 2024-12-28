"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import FormCreateTodo from "./FormCreateTodo";
import { useState } from "react";
import { PlusIcon } from "../icons";

export default function CreateButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen} className="w-9 h-9">
          <PlusIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="py-10">
        <DialogHeader>
          <DialogTitle>Create Todo</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new todo item.
          </DialogDescription>
        </DialogHeader>
        <FormCreateTodo onSuccess={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

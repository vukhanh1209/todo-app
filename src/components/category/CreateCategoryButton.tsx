"use client";
import { Button } from "@/components/ui/button";
import FormCategory from "./FormCategory";
import { useState } from "react";
import { PlusIcon } from "../icons";

export default function CreateCategoryButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={handleOpen} className="w-9 h-9">
        <PlusIcon className="w-4 h-4" />
      </Button>
      <FormCategory isOpen={isOpen} onClose={handleClose} />
    </>
  );
}

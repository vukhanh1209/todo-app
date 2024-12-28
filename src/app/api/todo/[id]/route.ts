import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { title, description, status, categoryId } = await request.json();
  const todoId = parseInt(params.id);

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: {
        title,
        description,
        status,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const todoId = parseInt(params.id);

  try {
    await prisma.todo.delete({
      where: { id: todoId },
    });
    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const todoId = parseInt(params.id);

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
      include: { category: true },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

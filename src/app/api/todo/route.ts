import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { title, description, categoryId } = await request.json();

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description: description || null,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
    });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      include: { category: true }, // Include category information
    });
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

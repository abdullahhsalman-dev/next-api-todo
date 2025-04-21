import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { completed } = await request.json();
    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed: Boolean(completed) },
    });
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update todo ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.todo.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete todo ${error}` },
      { status: 500 }
    );
  }
}

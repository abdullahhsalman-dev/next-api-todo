import { prisma } from "@/lib/prisma";

export const resolvers = {
  Query: {
    todos: async () => {
      return prisma.todo.findMany({
        orderBy: { createdAt: "desc" },
      });
    },
    todo: async (_: unknown, { id }: { id: number }) => {
      return prisma.todo.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createTodo: async (_: unknown, { title }: { title: string }) => {
      if (!title) throw new Error("Title is required");
      return prisma.todo.create({
        data: { title, completed: false },
      });
    },
    updateTodo: async (
      _: unknown,
      { id, completed }: { id: number; completed: boolean }
    ) => {
      try {
        return await prisma.todo.update({
          where: { id },
          data: { completed },
        });
      } catch (error) {
        throw new Error(`Failed to update  todo with ID ${id} ${error}`);
      }
    },
    deleteTodo: async (_: unknown, { id }: { id: number }) => {
      try {
        await prisma.todo.delete({
          where: { id },
        });
        return true;
      } catch (error) {
        console.log("errror is ", error);
        return false;
      }
    },
  },
};

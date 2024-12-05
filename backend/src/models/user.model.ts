import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function userModel() {
  return {
    queryUsers: async () => {
      return await prisma.user.findMany();
    },
    createUser: async (data: { userName: string }) => {
      return await prisma.user.create({ data });
    },
    queryUser: async (input: Prisma.UserFindUniqueArgs) => {
      return await prisma.user.findUnique(input);
    },
  };
}

userModel()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

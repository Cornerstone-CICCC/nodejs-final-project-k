import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  return {
    queryUsers: async () => {
      return await prisma.user.findMany();
    },
    createUser: async (data: {}) => {
      return await prisma.user.create({ data });
    },
  };
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

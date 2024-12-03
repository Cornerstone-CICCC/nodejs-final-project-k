import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  return {
    queryDateMessages: async () => {
      return await prisma.dateMessage.findMany();
    },
    createDateMessage: async () => {
      return await prisma.dateMessage.create({});
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

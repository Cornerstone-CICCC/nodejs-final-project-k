import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  return {
    queryMessages: async (arg?: Prisma.MessageFindManyArgs) => {
      return await prisma.message.findMany(arg);
    },
    createMessage: async (input: Prisma.MessageCreateArgs) => {
      return await prisma.message.create(input);
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

import { Prisma, PrismaClient } from "@prisma/client";
import { MessageData } from "../types/message_data";

const prisma = new PrismaClient();

export async function main() {
  return {
    queryMessages: async (arg?: Prisma.MessageFindManyArgs) => {
      return await prisma.message.findMany(arg);
    },
    createMessage: async (data: MessageData) => {
      return await prisma.message.create({ data });
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

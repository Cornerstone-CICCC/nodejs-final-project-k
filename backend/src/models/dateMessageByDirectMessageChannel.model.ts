import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function dateMessageByDirectMessageChannelModel() {
  return {
    queryDateMessageByDirectMessageChannel: async (
      input: Prisma.DateMessageByDirectMessageChannelFindManyArgs
    ) => {
      return await prisma.dateMessageByDirectMessageChannel.findMany(input);
    },
    createDateMessageByDirectMessageChannel: async (
      input: Prisma.DateMessageByDirectMessageChannelCreateArgs
    ) => {
      return await prisma.dateMessageByDirectMessageChannel.create(input);
    },
  };
}

dateMessageByDirectMessageChannelModel()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

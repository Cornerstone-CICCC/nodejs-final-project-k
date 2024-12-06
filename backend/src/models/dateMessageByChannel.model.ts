import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function dateMessageByChannelModel() {
  return {
    queryDateMessageByChannel: async (
      input: Prisma.DateMessageByChannelFindManyArgs
    ) => {
      return await prisma.dateMessageByChannel.findMany(input);
    },
    createDateMessageByChannel: async (
      input: Prisma.DateMessageByChannelCreateArgs
    ) => {
      return await prisma.dateMessageByChannel.create(input);
    },
  };
}

dateMessageByChannelModel()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// REF: https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/many-to-many-relations
export async function directMessageChannelModel() {
  return {
    createDirectMessageChannel: async (userIds: { userId: number }[]) => {
      return await prisma.directMessageChannel.create({
        data: { users: { create: userIds } },
      });
    },
    queryDirectMessageChannels: async (
      input: Prisma.DirectMessageChannelFindManyArgs
    ) => {
      return await prisma.directMessageChannel.findMany(input);
    },
  };
}

directMessageChannelModel()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

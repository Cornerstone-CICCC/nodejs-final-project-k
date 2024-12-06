import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// REF: https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/many-to-many-relations
export async function channelModel() {
  return {
    createChannel: async (input: Prisma.ChannelCreateArgs) => {
      return await prisma.channel.create(input);
    },
    queryChannels: async (input: Prisma.ChannelFindManyArgs) => {
      return await prisma.channel.findMany(input);
    },
  };
}

channelModel()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

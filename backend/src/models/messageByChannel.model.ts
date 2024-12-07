import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function messageByChannelModel() {
  return {
    queryMessages: async (arg?: Prisma.MessageByChannelFindManyArgs) => {
      return await prisma.messageByChannel.findMany(arg);
    },
    createMessage: async (input: Prisma.MessageByChannelCreateArgs) => {
      return await prisma.messageByChannel.create(input);
    },
    updateMessage: async (input: Prisma.MessageByChannelUpdateArgs) => {
      return await prisma.messageByChannel.update({
        where: { id: input.where.id },
        data: input.data,
      });
    },
    deleteMessage: async (input: Prisma.MessageByChannelDeleteArgs) => {
      return await prisma.messageByChannel.delete(input);
    },
  };
}

messageByChannelModel()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

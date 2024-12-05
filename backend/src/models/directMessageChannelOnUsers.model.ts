import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function directMessageChannelOnUsersModel() {
  return {
    queryDirectMessageChannelOnUsers: async (
      input: Prisma.DirectMessageChannelOnUsersFindManyArgs
    ) => {
      return await prisma.directMessageChannelOnUsers.findMany(input);
    },
  };
}

directMessageChannelOnUsersModel()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

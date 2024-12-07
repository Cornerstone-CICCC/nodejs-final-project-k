-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "dateMessageIdByDirectMessageChannel" INTEGER,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateMessageByDirectMessageChannel" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "directMessageChannelId" INTEGER NOT NULL,

    CONSTRAINT "DateMessageByDirectMessageChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectMessageChannel" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "DirectMessageChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DirectMessageChannelOnUsers" (
    "userId" INTEGER NOT NULL,
    "directMessageChannelId" INTEGER NOT NULL,

    CONSTRAINT "DirectMessageChannelOnUsers_pkey" PRIMARY KEY ("userId","directMessageChannelId")
);

-- CreateTable
CREATE TABLE "MessageByChannel" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "dateMessageIdByChannel" INTEGER,

    CONSTRAINT "MessageByChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateMessageByChannel" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channelId" INTEGER NOT NULL,

    CONSTRAINT "DateMessageByChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dateMessageIdByDirectMessageChannel_fkey" FOREIGN KEY ("dateMessageIdByDirectMessageChannel") REFERENCES "DateMessageByDirectMessageChannel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateMessageByDirectMessageChannel" ADD CONSTRAINT "DateMessageByDirectMessageChannel_directMessageChannelId_fkey" FOREIGN KEY ("directMessageChannelId") REFERENCES "DirectMessageChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessageChannelOnUsers" ADD CONSTRAINT "DirectMessageChannelOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessageChannelOnUsers" ADD CONSTRAINT "DirectMessageChannelOnUsers_directMessageChannelId_fkey" FOREIGN KEY ("directMessageChannelId") REFERENCES "DirectMessageChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageByChannel" ADD CONSTRAINT "MessageByChannel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageByChannel" ADD CONSTRAINT "MessageByChannel_dateMessageIdByChannel_fkey" FOREIGN KEY ("dateMessageIdByChannel") REFERENCES "DateMessageByChannel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateMessageByChannel" ADD CONSTRAINT "DateMessageByChannel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

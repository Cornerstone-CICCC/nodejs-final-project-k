import type { Metadata } from "next";
import { Box, Text, VStack } from "@chakra-ui/react";
import { User } from "../types/users";
import { SIDEBAR_WIDTH } from "../constants";
import { Users } from "./components/users";
import { getTokenAction } from "./actions/getTokenAction";
import { DirectMessageChannels } from "./components/direct-message-channels";
import { Channel } from "../types/channel";
import { MakeChannels } from "./components/make-channels";
import { Channels } from "./components/channels";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const { token } = await getTokenAction();
    const users = await fetch("http://localhost:8080/api/auth/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const usersJson: User[] = await users.json();

    const directMessageChannels = await fetch(
      "http://localhost:8080/api/auth/direct-message-channels",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const directMessageChannelsJson: Channel[] =
      await directMessageChannels.json();

    const channels = await fetch("http://localhost:8080/api/auth/channels", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const channelsJson: Channel[] = await channels.json();

    return (
      <>
        <Box
          h="100%"
          position="fixed"
          w={{ base: `${SIDEBAR_WIDTH.BASE}px`, md: `${SIDEBAR_WIDTH.MD}px` }}
          borderRight="1px solid gray"
          p="12px"
          top={0}
          bottom={0}
          overflowY="scroll"
        >
          <VStack gap="24px" alignItems="start" w="100%">
            <MakeChannels />
            <VStack gap="24px" alignItems="start" w="100%">
              <Text fontWeight={700}>Users</Text>
              <Users users={usersJson} />
            </VStack>
            <VStack gap="24px" alignItems="start" w="100%">
              <Text fontWeight={700}>Direct Messages</Text>
              <DirectMessageChannels
                directMessageChannels={directMessageChannelsJson}
              />
            </VStack>
            <VStack gap="24px" alignItems="start" w="100%">
              <Text fontWeight={700}>Channels</Text>
              <Channels channels={channelsJson} />
            </VStack>
          </VStack>
        </Box>
        <Box
          ml={{ base: `${SIDEBAR_WIDTH.BASE}px`, md: `${SIDEBAR_WIDTH.MD}px` }}
          w={{
            base: `calc(100dvw - ${SIDEBAR_WIDTH.BASE}px)`,
            md: `calc(100dvw - ${SIDEBAR_WIDTH.MD}px)`,
          }}
          h="100%"
        >
          {children}
        </Box>
      </>
    );
  } catch (error) {
    console.error(error);
    return <Text>Failed to fetch data</Text>;
  }
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

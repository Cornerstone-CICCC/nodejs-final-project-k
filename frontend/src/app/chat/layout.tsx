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
    const users = await fetch("http://localhost:8080/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const usersJson: User[] = await users.json();

    const directMessageChannels = await fetch(
      "http://localhost:8080/api/direct-message-channels",
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

    const channels = await fetch("http://localhost:8080/api/channels", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const channelsJson: Channel[] = await channels.json();

    return (
      <Box p="24px">
        <Box
          position="fixed"
          w={`${SIDEBAR_WIDTH}px`}
          borderRight="1px solid gray"
          h="100dvh"
        >
          <VStack gap="24px" alignItems="start" w="100%">
            <VStack gap="24px" alignItems="start">
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
          <MakeChannels />
        </Box>
        <Box ml={`${SIDEBAR_WIDTH}px`} w={`calc(100dvw - ${SIDEBAR_WIDTH}px)`}>
          {children}
        </Box>
      </Box>
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

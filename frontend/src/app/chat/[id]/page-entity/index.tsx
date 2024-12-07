"use client";

import { Box, Flex, Divider, Text } from "@chakra-ui/react";
import { useHooks } from "./hooks/hooks";
import dayjs from "dayjs";
import { ChatForm } from "./components/chat-form";
import { MessagesByDate } from "@/app/types/messagesByDate";
import { MessageByDate } from "./components/message-by-date";

export function PageEntity({
  messagesByDates,
}: {
  messagesByDates: MessagesByDate[];
}) {
  useHooks();

  return (
    <Box>
      {messagesByDates.map(({ id, created_at, messages }) => {
        return (
          <Box key={id}>
            <Flex alignItems="center">
              <Divider />
              <Text px="16px" whiteSpace="nowrap">
                <time dateTime={dayjs(created_at).format("YYYY-MM-DD")}>
                  {dayjs(created_at).format("YYYY-MM-DD")}
                </time>
              </Text>
              <Divider />
            </Flex>
            {messages.map((message) => {
              return <MessageByDate {...message} key={message.id} />;
            })}
          </Box>
        );
      })}
      <ChatForm />
    </Box>
  );
}

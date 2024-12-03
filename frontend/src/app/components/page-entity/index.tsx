"use client";

import { Box, Flex, Divider, Text } from "@chakra-ui/react";
import { MessagesByDate } from "../../types/messagesByDate";
import { useHooks } from "./hooks/hooks";
import dayjs from "dayjs";
import { ChatForm } from "./components/chat-form";

export function PageEntity({
  messagesByDates,
}: {
  messagesByDates: MessagesByDate[];
}) {
  useHooks();
  return (
    <>
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
            {messages.map(({ id, userId, created_at, text }) => {
              return (
                <Box px="16px" key={id} pb="16px">
                  <Flex gap="8px">
                    <Text fontWeight={700}>{userId}</Text>
                    {/* TODO: make time fixed using position: sticky or fixed */}
                    <time dateTime={dayjs(created_at).format("HH:mm")}>
                      {dayjs(created_at).format("HH:mm")}
                    </time>
                  </Flex>
                  <Text>{text}</Text>
                </Box>
              );
            })}
          </Box>
        );
      })}
      <ChatForm />
    </>
  );
}

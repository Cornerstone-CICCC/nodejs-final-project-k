"use client";

import { Box, Flex, Divider, Text } from "@chakra-ui/react";
import { useHooks } from "./hooks/hooks";
import dayjs from "dayjs";
import { ChatForm } from "./components/chat-form";
import { MessagesByDate } from "@/app/types/messagesByDate";
import { FORM_HEIGHT } from "../constants";

export function PageEntity({
  messagesByDates,
}: {
  messagesByDates: MessagesByDate[];
}) {
  useHooks();
  return (
    <>
      <Box h={`calc(100% - ${FORM_HEIGHT}px)`} overflowY="scroll">
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
              <Box h="100%">
                {messages.map(({ id, userName, created_at, text }) => {
                  return (
                    <Box px="16px" key={id} pb="16px">
                      <Flex gap="8px">
                        <Text fontWeight={700}>{userName}</Text>
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
            </Box>
          );
        })}
      </Box>
      <ChatForm />
    </>
  );
}

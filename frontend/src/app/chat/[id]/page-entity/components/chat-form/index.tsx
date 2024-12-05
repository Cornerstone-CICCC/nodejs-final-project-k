"use client";

import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useHooks } from "./hooks";
import { SIDEBAR_WIDTH } from "@/app/constants";
import { FORM_HEIGHT } from "../../../constants";

export function ChatForm() {
  const { inputRef, isPending, submit } = useHooks();

  return (
    <Box
      p="16px"
      position="fixed"
      bottom={0}
      backgroundColor="gray.900"
      h={`${FORM_HEIGHT}px`}
      w={`calc(100dvw - ${SIDEBAR_WIDTH}px)`}
    >
      <form onSubmit={submit}>
        <fieldset disabled={isPending}>
          <Flex gap="24px">
            <Input
              ref={inputRef}
              placeholder="Type a message"
              name="text"
              isRequired
              maxW="800px"
            />
            <Button type="submit" isLoading={isPending}>
              Send
            </Button>
          </Flex>
        </fieldset>
      </form>
    </Box>
  );
}

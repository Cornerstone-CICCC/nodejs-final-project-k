"use client";

import { Box, Flex, Input, Button, Text } from "@chakra-ui/react";
import { FORM_HEIGHT } from "../../../../constants";
import { useHooks } from "./hooks";

export function ChatForm() {
  const { error, isPending, submitAction } = useHooks();

  return (
    <Box
      p="16px"
      position="fixed"
      bottom={0}
      backgroundColor="gray.900"
      w="100%"
      h={`${FORM_HEIGHT}px`}
    >
      <form action={submitAction}>
        <fieldset disabled={isPending}>
          <Flex gap="12px">
            <Input placeholder="Type a message" name="text" isRequired />
            <Button type="submit" isLoading={isPending}>
              Send
            </Button>
          </Flex>
        </fieldset>
      </form>
      {error ? <Text>error: {JSON.stringify(error)}</Text> : null}
    </Box>
  );
}

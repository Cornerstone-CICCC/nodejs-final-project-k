"use client";
import { Box, Button, Input, VStack } from "@chakra-ui/react";
import { useHooks } from "./hooks";
import Link from "next/link";

export function LoginForm() {
  const { isPending, submitAction } = useHooks();
  return (
    <>
      <form action={submitAction}>
        <fieldset disabled={isPending}>
          <VStack gap="24px">
            <Input placeholder="Username" name="userName" isRequired />
            <Button type="submit" isLoading={isPending}>
              Login
            </Button>
          </VStack>
        </fieldset>
      </form>
      <Box>
        <Button as={Link} href="/signup">
          Signup
        </Button>
      </Box>
    </>
  );
}

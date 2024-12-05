"use client";
import { Button, Input, VStack } from "@chakra-ui/react";
import { useHooks } from "./hooks";

export function SignupForm() {
  const { isPending, submitAction } = useHooks();
  return (
    <>
      <form action={submitAction}>
        <fieldset disabled={isPending}>
          <VStack gap="24px">
            <Input placeholder="Username" name="userName" isRequired />
            <Button type="submit" isLoading={isPending}>
              Signup
            </Button>
          </VStack>
        </fieldset>
      </form>
    </>
  );
}

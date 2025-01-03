"use client";
import type { Metadata } from "next";
import { Button, Text } from "@chakra-ui/react";
import { useHooks } from "./hooks";
import Link from "next/link";
import { Channel } from "@/app/types/channel";

export function DirectMessageChannels({
  directMessageChannels,
}: Readonly<{
  directMessageChannels: Channel[];
}>) {
  useHooks();
  return (
    <>
      {directMessageChannels.map(({ id, name }) => {
        return (
          <Button
            as={Link}
            href={`/chat/direct-message/${id}`}
            w="100%"
            borderBottom="1px solid gray"
            alignItems="start"
            flexDirection="column"
            key={id}
          >
            <Text fontSize={{ base: "8px", md: "initial" }}>{name}</Text>
          </Button>
        );
      })}
    </>
  );
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

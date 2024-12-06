"use client";
import { Button, Text } from "@chakra-ui/react";
import { useHooks } from "./hooks";
import Link from "next/link";
import { Channel } from "@/app/types/channel";

export function Channels({
  channels,
}: Readonly<{
  channels: Channel[];
}>) {
  useHooks();
  return (
    <>
      {channels.map(({ id, name }) => {
        return (
          <Button
            as={Link}
            href={`/chat/${id}`}
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

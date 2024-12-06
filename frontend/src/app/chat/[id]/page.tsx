import { Box } from "@chakra-ui/react";
import { MessagesByDate } from "../../types/messagesByDate";
import { FORM_HEIGHT } from "./constants";
import { PageEntity } from "./page-entity";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const id = (await params).id;
    const messages = await fetch(
      `http://localhost:8080/api/date-messages/${id}`
    );
    const messagesJson: MessagesByDate[] = await messages.json();
    return (
      <Box position="relative" pb={`${FORM_HEIGHT}px`}>
        <PageEntity messagesByDates={messagesJson} />
      </Box>
    );
  } catch (error) {
    console.error(error);
    return <>Something went wrong</>;
  }
}

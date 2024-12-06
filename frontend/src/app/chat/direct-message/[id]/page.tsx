import { Box } from "@chakra-ui/react";
import { FORM_HEIGHT } from "./constants";
import { PageEntity } from "./page-entity";
import { MessagesByDate } from "@/app/types/messagesByDate";
import { getTokenAction } from "../../actions/getTokenAction";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const id = (await params).id;
    const { token } = await getTokenAction();
    const messages = await fetch(
      `http://localhost:8080/api/auth/date-messages-by-direct-message-channel/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const messagesJson: MessagesByDate[] = await messages.json();
    return (
      <Box position="relative" pb={`${FORM_HEIGHT}px`} h="100%">
        <PageEntity messagesByDates={messagesJson} />
      </Box>
    );
  } catch (error) {
    console.error(error);
    return <>Something went wrong</>;
  }
}

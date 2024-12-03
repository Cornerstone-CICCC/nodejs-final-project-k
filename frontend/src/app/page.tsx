import { Box } from "@chakra-ui/react";
import { PageEntity } from "./components/page-entity";
import { MessagesByDate } from "./types/messagesByDate";
import { FORM_HEIGHT } from "./constants";

export default async function Page() {
  try {
    const response = await fetch("http://localhost:8080/api/date-messages");
    if (!response.status.toString().startsWith("2")) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json: MessagesByDate[] = await response.json();
    return (
      <Box position="relative" pb={`${FORM_HEIGHT}px`}>
        <PageEntity messagesByDates={json} />
      </Box>
    );
  } catch (error) {
    console.error(error);
    return <>Something went wrong</>;
  }
}

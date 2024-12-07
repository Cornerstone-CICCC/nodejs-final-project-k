import { FormEvent, useEffect, useRef, useState } from "react";
import { socket } from "@/app/utils/socket";
import { revalidate } from "@/app/chat/actions/revalidate";
import { getTokenAction } from "@/app/chat/actions/getTokenAction";
import { useToast } from "@chakra-ui/react";

export function useHooks() {
  useEffect(() => {
    socket.on("updatedMessageFromChannel", () => {
      (async () => {
        await revalidate("/chat/:id");
      })();
    });
    return () => {
      socket.off("updatedMessageFromChannel");
    };
  }, []);
  useEffect(() => {
    socket.on("deleteMessageFromChannel", () => {
      (async () => {
        await revalidate("/chat/:id");
      })();
    });
    return () => {
      socket.off("deleteMessageFromChannel");
    };
  }, []);

  const [hasActions, setHasActions] = useState(false);
  const showActions = () => {
    setHasActions(true);
  };
  const closeActions = () => {
    setHasActions(false);
  };

  const [messageIdToBeUpdated, setMessageIdToBeUpdated] = useState<
    number | undefined
  >();
  const startToEditMessage = (id: number) => {
    setMessageIdToBeUpdated(id);
    closeActions();
  };
  const cancelEditingMessage = () => {
    setMessageIdToBeUpdated(undefined);
  };
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const toast = useToast();
  const [isPending, setIsPending] = useState(false);
  const updateMessage = async (e: FormEvent<HTMLFormElement>) => {
    if (!messageRef.current) {
      throw new Error("messageRef.current is null");
    }
    e.preventDefault();
    setIsPending(true);
    try {
      const { token } = await getTokenAction();
      socket.emit("updateMessageFromChannel", {
        text: messageRef.current.value,
        messageId: messageIdToBeUpdated,
        token,
      });
    } catch (error) {
      toast({ description: JSON.stringify(error), status: "error" });
    } finally {
      setIsPending(false);
    }
    setMessageIdToBeUpdated(undefined);
    messageRef.current.value = "";
  };

  const [messageIdToBeDeleted, setMessageIdToBeDeleted] = useState<
    number | undefined
  >();
  const openModalToConfirmDeleteMessage = (id: number) => {
    setMessageIdToBeDeleted(id);
  };
  const closeModalToConfirmDeleteMessage = () => {
    setMessageIdToBeDeleted(undefined);
  };

  const deleteMessage = async () => {
    setIsPending(true);

    try {
      const { token } = await getTokenAction();
      socket.emit("deleteMessageFromChannel", {
        messageId: messageIdToBeDeleted,
        token,
      });
    } catch (error) {
      toast({ description: JSON.stringify(error), status: "error" });
    } finally {
      setIsPending(false);
    }
    setMessageIdToBeUpdated(undefined);
  };

  return {
    showActions,
    closeActions,
    hasActions,
    startToEditMessage,
    messageIdToBeUpdated,
    cancelEditingMessage,
    messageRef,
    updateMessage,
    isPending,
    openModalToConfirmDeleteMessage,
    messageIdToBeDeleted,
    closeModalToConfirmDeleteMessage,
    deleteMessage,
  };
}

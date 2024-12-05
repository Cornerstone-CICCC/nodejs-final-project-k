import { getTokenAction } from "@/app/chat/actions/getTokenAction";
import { socket } from "@/app/utils/socket";
import { useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";

export function useHooks() {
  const [isOpen, setIsOpen] = useState(false);
  const userIdRef = useRef<number | null>(null);
  const openModal = (userId: number) => {
    setIsOpen(true);
    userIdRef.current = userId;
  };
  const closeModal = () => {
    setIsOpen(false);
    userIdRef.current = null;
  };

  const [isPending, setIsPending] = useState(false);
  const toast = useToast();
  const createDirectMessageChat = async () => {
    setIsPending(true);
    try {
      if (!userIdRef.current) return;
      const { token } = await getTokenAction();
      socket.emit("createDirectMessageChat", {
        userId: userIdRef.current,
        token: token,
      });
      closeModal();
    } catch (error) {
      toast({ description: JSON.stringify(error), status: "error" });
    } finally {
      setIsPending(false);
    }
  };

  return { openModal, closeModal, isOpen, isPending, createDirectMessageChat };
}

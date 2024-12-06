import { getTokenAction } from "@/app/chat/actions/getTokenAction";
import { socket } from "@/app/utils/socket";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

export function useHooks() {
  const [isOpen, setIsOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    if (!nameRef.current) return;
    nameRef.current.value = "";
  };

  const [isPending, setIsPending] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const createChannel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    try {
      if (!nameRef.current) return;
      const { token } = await getTokenAction();
      socket.emit("createChannel", { name: nameRef.current.value, token });
      closeModal();
      socket.on("newChannel", ({ id }) => {
        router.push(`/chat/${id}`);
      });
    } catch (error) {
      toast({ description: JSON.stringify(error), status: "error" });
    } finally {
      setIsPending(false);
    }
  };

  return {
    openModal,
    closeModal,
    isOpen,
    isPending,
    createChannel,
    nameRef,
  };
}

import { FormEvent, useRef, useState } from "react";
import { socket } from "@/app/utils/socket";
import { useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { getTokenAction } from "@/app/chat/actions/getTokenAction";

export function useHooks() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();
  const params = useParams<{ id: string }>();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    try {
      if (!inputRef.current) return;
      const { token } = await getTokenAction();
      socket.emit("sendMessageFromDm", {
        text: inputRef.current.value,
        token,
        directMessageChannelId: params.id,
      });
      inputRef.current.value = "";
    } catch (error) {
      toast({ description: JSON.stringify(error), status: "error" });
    } finally {
      setIsPending(false);
    }
  };

  return { inputRef, isPending, submit };
}

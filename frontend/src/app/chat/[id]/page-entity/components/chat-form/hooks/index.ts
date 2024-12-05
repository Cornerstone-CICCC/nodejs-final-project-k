import { FormEvent, useRef, useState } from "react";
import { socket } from "@/app/utils/socket";
import { getTokenAction } from "../../../../../actions/getTokenAction";
import { useToast } from "@chakra-ui/react";

export function useHooks() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    try {
      if (!inputRef.current) return;
      const { token } = await getTokenAction();
      socket.emit("sendMessage", {
        text: inputRef.current.value,
        token,
      });
    } catch (error) {
      toast({ description: JSON.stringify(error), status: "error" });
    } finally {
      setIsPending(false);
    }
  };

  return { inputRef, isPending, submit };
}

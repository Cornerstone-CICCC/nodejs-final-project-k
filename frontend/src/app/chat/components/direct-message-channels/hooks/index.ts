import { socket } from "@/app/utils/socket";
import { useEffect, useRef } from "react";
import { revalidate } from "./actions/revalidate";

export function useHooks() {
  const hasNewDirectMessageChannels = useRef(false);
  useEffect(() => {
    socket.on("newDirectMessageChannels", (data) => {
      console.log("newDirectMessageChannels", data);
      hasNewDirectMessageChannels.current = true;
      (async () => {
        await revalidate("/chat");
      })();
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);
}

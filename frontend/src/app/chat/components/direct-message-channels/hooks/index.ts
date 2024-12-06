import { socket } from "@/app/utils/socket";
import { useEffect } from "react";
import { revalidate } from "../../../actions/revalidate";

export function useHooks() {
  useEffect(() => {
    socket.on("newDirectMessageChannel", () => {
      (async () => {
        await revalidate("/chat");
      })();
    });

    return () => {
      socket.off("newDirectMessageChannel");
    };
  }, []);
}

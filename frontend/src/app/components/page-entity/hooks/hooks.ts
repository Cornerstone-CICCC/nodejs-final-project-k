import { useEffect, useState } from "react";
import { setCookie } from "./actions/set-cookie";
import { socket } from "@/app/utils/socket";
import { MessagesByDate } from "@/app/types/messagesByDate";

export function useHooks({
  defaultMessagesByDates,
}: {
  defaultMessagesByDates: MessagesByDate[];
}) {
  useEffect(() => {
    (async () => {
      await setCookie();
    })();
  }, []);

  // NOTE: show Socket connection status
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  console.log(`Status: ${isConnected ? "connected" : "disconnected"}`);
  console.log(`Transport: ${transport}`);

  const [messagesByDates, setMessagesByDates] = useState(
    defaultMessagesByDates
  );
  useEffect(() => {
    socket.on("newMessage", (data) => {
      setMessagesByDates(data);
    });
    return () => {
      socket.off("newMessage");
    };
  }, []);

  return { messagesByDates };
}

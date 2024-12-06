import { useEffect, useState } from "react";
import { socket } from "@/app/utils/socket";
import { revalidate } from "@/app/chat/actions/revalidate";

export function useHooks() {
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

  useEffect(() => {
    socket.on("newMessage", () => {
      (async () => {
        await revalidate("/chat/:id");
      })();
    });
    return () => {
      socket.off("newMessage");
    };
  }, []);
}

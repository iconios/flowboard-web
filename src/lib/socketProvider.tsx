/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { io, type Socket } from "socket.io-client";
import {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  Children,
} from "react";

interface SocketCtxType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketCtx = createContext<SocketCtxType>({
  socket: null,
  isConnected: false,
});
export const useSocket = () => useContext(SocketCtx);

export function SocketProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const closingRef = useRef(false);
  console.trace("SocketProvider children rendered");

  useEffect(() => {
    const raw = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    console.log("[socket] NEXT_PUBLIC_SERVER_BASE_URL:", JSON.stringify(raw));

    if (!raw) {
      // if server url goes null, close any existing socket
      if (socket) {
        closingRef.current = true;
        socket.close();
        setSocket(null);
        setIsConnected(false);
        closingRef.current = false;
      }
      return;
    }

    const SERVER_BASE_URL = raw.replace(/\/+$/, "");
    console.log("[socket] SERVER_BASE_URL:", SERVER_BASE_URL);

    // Close old socket (if any) before creating a new one
    if (socket) {
      closingRef.current = true;
      socket.close();
      setSocket(null);
      setIsConnected(false);
      closingRef.current = false;
    }

    const s = io(SERVER_BASE_URL, {
      path: "/socket.io",
      // Uncomment if polling causes issues in your environment:
      // transports: ["websocket"],
      withCredentials: true,
    });

    // Wire up basic events
    s.on("connect", () => {
      console.log("[socket] connected:", s.id);
      setIsConnected(true);
    });
    s.on("disconnect", (reason) => {
      console.log("[socket] disconnected:", reason);
      setIsConnected(false);
    });
    s.on("connect_error", (err: any) => {
      console.error("[socket] connect_error:", err.message);
      setIsConnected(false);
    });

    setSocket(s);
    setIsConnected(s.connected);

    // Cleanup on unmount or token change
    return () => {
      if (!closingRef.current) {
        s.close();
        setIsConnected(false);
      }
    };
  }, []); // env is read at runtime; no need to add to deps

  return (
    <SocketCtx.Provider value={{ socket, isConnected }}>
      {Children.toArray(children)}
    </SocketCtx.Provider>
  );
}

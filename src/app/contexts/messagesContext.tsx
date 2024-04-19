"use client";
import { Message } from ".prisma/client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getMessages } from "@/app/services/threadService";
import { toast } from "react-toastify";

type MessageContext = {
  messages: Message[];
  refreshMessages: () => void;
};

export const MessageContext = createContext<MessageContext>({
  messages: [],
  refreshMessages: () => {},
});

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const fetchMessages = async () => {
    try {
      const res = await getMessages();
      setMessages(res);
    } catch (e) {
      toast.error("Error fetching messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const refreshMessages = async () => {
    await fetchMessages();
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        refreshMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

"use client";
import React, { useContext, useEffect, useRef } from "react";
import { Message, Thread } from ".prisma/client";
import { addMessage, getThread } from "@/app/services/threadService";
import MessageInput from "@/app/components/chat/messageInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCommentMedical } from "@fortawesome/free-solid-svg-icons";
import ChatMsg from "@/app/components/chat/chatMsg";
import { User } from "@/app/services/userService";
import DialogBox from "@/app/components/chat/dialogBox";
import { useSession } from "next-auth/react";
import { MessageContext } from "@/app/contexts/messagesContext";

const MessageList = ({ id }: { id: string }) => {
  const { refreshMessages } = useContext(MessageContext);
  const [loading, setLoading] = React.useState(true);
  const [thread, setThread] = React.useState<
    (Thread & { messages: Message[]; doctor: User; patient: User }) | null
  >(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [text, setText] = React.useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { data: session } = useSession();
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    const fetchThread = async () => {
      try {
        const res = await getThread(id);
        setThread(res);
        setMessages(res.messages);
        setLoading(false);
        refreshMessages();
      } catch (e) {
        throw e;
      }
    };
    fetchThread();
  }, [id]);

  const handleNewMessage = async () => {
    if (text.length === 0) return;
    const newMessage = await addMessage({
      threadId: thread?.id!,
      message: text,
      senderId: session?.user.id,
      receiverId:
        session?.user.role === "Doctor"
          ? thread?.patientId || ""
          : thread?.doctorId || "",
    });
    setMessages([...messages, newMessage]);
    setText("");
  };

  if (loading)
    return <div className={"w-full text-center mt-2"}>Loading...</div>;

  return (
    <div
      className={"w-full flex grow flex-col items-center mt-4"}
      style={{ height: `calc(100vh - 100px)` }}
    >
      <div className={"w-full flex justify-center"}>
        <div className={"font-bold text-primary text-xl md:text-3xl"}>
          <FontAwesomeIcon icon={faCommentMedical} className={"me-2"} />
          Messages to{" "}
          {session?.user.role === "Doctor"
            ? thread?.patient.username
            : thread?.doctor.username}
        </div>
      </div>
      <div className={"grow overflow-auto w-full flex justify-center"}>
        <DialogBox
          messages={messages}
          thread={thread}
          endRef={messagesEndRef}
        />
      </div>

      <div className={"w-8/12 flex justify-center items-center gap-4"}>
        <MessageInput value={text} setValue={setText} />
        <button
          className={`${
            text.length === 0 ? "bg-gray-500" : "bg-primary"
          }  text-white px-4 py-3 flex rounded`}
          disabled={text.length === 0}
          onClick={handleNewMessage}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </div>
  );
};

export default MessageList;

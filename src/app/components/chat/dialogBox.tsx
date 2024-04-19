import React from "react";
import ChatMsg from "@/app/components/chat/chatMsg";
import { Message, Thread } from ".prisma/client";
import { User } from "@/app/services/userService";

const DialogBox = ({
  messages,
  thread,
  endRef,
}: {
  messages: Message[];
  thread:
    | (Thread & { messages: Message[]; doctor: User; patient: User })
    | null;
  endRef: any;
}) => {
  return (
    <div className={"w-8/12 flex flex-col items-start"}>
      {messages.map((message) => (
        <div key={message.id}>
          <ChatMsg
            text={message.content}
            user={
              message.senderId === thread?.doctorId
                ? thread?.doctor
                : thread?.patient
            }
          />
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default DialogBox;

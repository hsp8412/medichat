import React from "react";
import MessageList from "@/app/components/chat/messageList";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className={"h-full"}>
      <MessageList id={params.id} />
    </div>
  );
};

export default Page;

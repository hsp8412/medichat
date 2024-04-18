import React from "react";
import MessageList from "@/app/components/messageList";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className={"h-full grow h-[]"}>
      <MessageList id={params.id} />
    </div>
  );
};

export default Page;

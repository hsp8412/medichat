import React from "react";
import MessageList from "@/app/components/chat/messageList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentMedical } from "@fortawesome/free-solid-svg-icons";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className={"h-full"}>
      <MessageList id={params.id} />
    </div>
  );
};

export default Page;

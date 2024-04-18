import React from "react";
import { User } from "@/app/services/userService";

const ChatMsg = ({ text, user }: { text: string; user: User | undefined }) => {
  return (
    <div className={"rounded p-5 flex flex-col"}>
      <div className={"flex items-center me-2 gap-2 mb-2"}>
        <img
          src={user?.avatarUrl || "/headshot.jpg"}
          alt={user?.username}
          className={"rounded-full w-12"}
        />
        <div className={"text-primary font-semibold"}>{user?.username}</div>
      </div>
      <div className={"bg-white shadow rounded p-3 w-auto"}>{text}</div>
    </div>
  );
};

export default ChatMsg;

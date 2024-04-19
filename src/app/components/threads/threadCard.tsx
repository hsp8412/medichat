import React from "react";
import { Message, Thread, User } from ".prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ThreadCard = ({
  type,
  thread,
  setCloseThreadModalOpen,
  setThreadToClose,
}: {
  type: string;
  thread: Thread & { messages: Message[]; doctor: User; patient: User };
  setCloseThreadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setThreadToClose: React.Dispatch<
    React.SetStateAction<
      (Thread & { messages: Message[]; doctor: User; patient: User }) | null
    >
  >;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSelectThread = (thread: Thread) => {
    if (!thread.closed) router.push(`/threads/${thread.id}`);
  };

  const unreadMessages = thread.messages.filter(
    (message) => message.receiverId === session?.user?.id && !message.readTime
  );

  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setThreadToClose(thread);
    setCloseThreadModalOpen(true);
  };

  if (type === "doctor") {
    return (
      <div
        key={thread.id}
        className={`w-full relative  p-4 grid grid-cols-6 gap-3 rounded h-full  hover:shadow-xl transition-shadow duration-200 ease-in  ${
          thread.closed ? "bg-gray-200" : " bg-white cursor-pointer"
        }`}
        onClick={() => handleSelectThread(thread)}
      >
        {unreadMessages.length > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4 bg-red-500 rounded-full text-white text-xs">
            {unreadMessages.length}
          </span>
        )}
        <div className={"col-span-1 flex justify-center items-center"}>
          <img
            src={
              (type === "doctor"
                ? thread.patient.avatarUrl
                : thread.doctor.avatarUrl) || "/headshot.jpg"
            }
            alt="headshot"
            className="rounded-full w-full md:w-14"
          />
        </div>
        <div className={"col-span-1 flex justify-center items-center"}>
          <p className={"font-bold text-sm md:text-2xl text-primary"}>
            {type === "doctor"
              ? thread.patient.username
              : thread.doctor.username}
          </p>
        </div>
        <div className={"col-span-3 flex justify-start items-center"}>
          <p className={"truncate"}>{thread.messages[0].content}</p>
        </div>
        <div className={"col-span-1 flex justify-start items-center"}>
          {thread.closed ? (
            <div>Closed</div>
          ) : (
            <button
              className={
                "bg-red-500 text-white p-2 hover:bg-red-400 transition-all duration-200 ease-in rounded"
              }
              onClick={(e) => {
                handleCloseClick(e);
              }}
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      key={thread.id}
      className={
        "relative bg-white p-4 grid grid-cols-5 gap-3 rounded h-full w-full hover:shadow-xl transition-shadow duration-200 ease-in cursor-pointer"
      }
      onClick={() => handleSelectThread(thread)}
    >
      {unreadMessages.length > 0 && (
        <span className="absolute top-0 right-0 p-1 transform inline-flex items-center justify-center bg-red-500 rounded-xl text-white text-xs">
          You have {unreadMessages.length} new message(s)
        </span>
      )}
      <div className={"col-span-1 flex justify-center items-center"}>
        <img
          src={
            (type === "doctor"
              ? thread.patient.avatarUrl
              : thread.doctor.avatarUrl) || "/headshot.jpg"
          }
          alt="headshot"
          className="rounded-full w-full md:w-14"
        />
      </div>
      <div className={"col-span-1 flex justify-center items-center"}>
        <p className={"font-bold text-sm md:text-2xl text-primary"}>
          {type === "doctor" ? thread.patient.username : thread.doctor.username}
        </p>
      </div>
      <div className={"col-span-3 flex justify-start items-center"}>
        <p className={"truncate"}>{thread.messages[0].content}</p>
      </div>
    </div>
  );
};

export default ThreadCard;

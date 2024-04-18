"use client";
import React, { useEffect, useState } from "react";
import { getThreads } from "@/app/services/threadService";
import { Message, Thread, User } from ".prisma/client";
import { useRouter } from "next/navigation";

const ThreadsList = ({ type }: { type: "patient" | "doctor" }) => {
  const [threads, setThreads] = useState<
    (Thread & { messages: Message[]; doctor: User; patient: User })[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchThreads = async () => {
    try {
      const res = await getThreads();
      setThreads(res);
      console.log(res);
      setLoading(false);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const handleSelectThread = (thread: Thread) => {
    router.push(`/threads/${thread.id}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className={"w-full flex justify-center my-6"}>
        <div
          className={"w-7/12 flex flex-col justify-center items-center gap-3"}
        >
          {threads.map((thread) => (
            <div
              key={thread.id}
              className={"bg-white p-4 grid grid-cols-5 rounded h-full w-full"}
              onClick={() => handleSelectThread(thread)}
            >
              <div className={"col-span-1 flex justify-center items-center"}>
                <img
                  src={
                    (type === "doctor"
                      ? thread.patient.avatarUrl
                      : thread.doctor.avatarUrl) || "/headshot.jpg"
                  }
                  alt="headshot"
                  className="rounded-full w-16"
                />
              </div>
              <div className={"col-span-1 flex justify-center items-center"}>
                <p className={"font-bold text-2xl"}>
                  {type === "doctor"
                    ? thread.patient.username
                    : thread.doctor.username}
                </p>
              </div>
              <div className={"col-span-3 flex justify-start items-center"}>
                <p className={"truncate"}>{thread.messages[0].content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreadsList;

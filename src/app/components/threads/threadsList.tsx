"use client";
import React, { useEffect, useState } from "react";
import { closeThread, getThreads } from "@/app/services/threadService";
import { Message, Thread, User } from ".prisma/client";
import { useRouter } from "next/navigation";
import ThreadCard from "@/app/components/threads/threadCard";
import Pagination from "@/app/components/pagi/pagination";
import _ from "lodash";
import MyModal from "@/app/components/users/myModal";
import CloseThreadMessage from "@/app/components/threads/closeThreadMessage";
import { toast } from "react-toastify";
import FilterButtons from "@/app/components/threads/filterButtons";
import { useSession } from "next-auth/react";
import HideClosedToggle from "@/app/components/threads/hideClosedToggle";

const ThreadsList = ({ type }: { type: "patient" | "doctor" }) => {
  const [threads, setThreads] = useState<
    (Thread & { messages: Message[]; doctor: User; patient: User })[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [threadToClose, setThreadToClose] = useState<
    (Thread & { messages: Message[]; doctor: User; patient: User }) | null
  >(null);
  const [closeThreadModalOpen, setCloseThreadModalOpen] =
    useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [filterUnread, setFilterUnread] = useState<boolean>(false);
  const [hideClosed, setHideClosed] = useState<boolean>(false);
  const router = useRouter();

  const { data: session } = useSession();

  const handleThreadClose = async () => {
    if (threadToClose) {
      setDeleting(true);
      try {
        await closeThread(threadToClose.id);
        setCloseThreadModalOpen(false);
        threadToClose.closed = true;
        setThreads([...threads, threadToClose]);
        setThreadToClose(null);
        setDeleting(false);
        toast.success("Thread closed successfully");
      } catch (e) {
        throw e;
      }
    }
  };

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

  let filteredThreads = hideClosed
    ? threads.filter((thread) => !thread.closed)
    : threads;
  if (filterUnread) {
    filteredThreads = threads.filter((thread) =>
      thread.messages.some(
        (message) =>
          !message.readTime && message.receiverId === session?.user?.id
      )
    );
  }

  const pageSize = 5;
  const pageCount = Math.ceil(filteredThreads.length / pageSize);
  const paginatedThreads = _.chunk(filteredThreads, pageSize)[currentPage - 1];

  if (loading) return <div>Loading...</div>;

  return (
    <div className={"w-full flex flex-col items-center justify-center my-6"}>
      <div className="w-11/12 md:w-7/12 flex flex-col justify-center items-center gap-3 mb-4">
        {session?.user?.role === "Doctor" ? (
          <div className={"flex items-center justify-between w-full"}>
            <FilterButtons
              filterUnread={filterUnread}
              setFilterUnread={setFilterUnread}
            />
            <HideClosedToggle
              hideClosed={hideClosed}
              setHideClosed={setHideClosed}
            />
          </div>
        ) : (
          <FilterButtons
            filterUnread={filterUnread}
            setFilterUnread={setFilterUnread}
          />
        )}

        {!paginatedThreads || paginatedThreads.length === 0 ? (
          <div>No threads found</div>
        ) : (
          paginatedThreads.map((thread) => (
            <ThreadCard
              type={type}
              thread={thread}
              key={thread.id}
              setThreadToClose={setThreadToClose}
              setCloseThreadModalOpen={setCloseThreadModalOpen}
            />
          ))
        )}
      </div>
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <MyModal open={closeThreadModalOpen} setOpen={setCloseThreadModalOpen}>
        <CloseThreadMessage
          patientUsername={threadToClose?.patient.username || ""}
          handleConfirm={handleThreadClose}
          setOpen={setCloseThreadModalOpen}
          deleting={deleting}
        />
      </MyModal>
    </div>
  );
};

export default ThreadsList;

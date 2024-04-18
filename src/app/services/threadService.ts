import httpService from "@/app/services/httpService";
import { Thread } from ".prisma/client";

const urlBase = process.env.NEXT_PUBLIC_API_BASE;
export const createThread = async ({
  message,
  doctorId,
  patientId,
}: {
  message: string;
  doctorId: string;
  patientId: string;
}) => {
  try {
    const res = await httpService.post(`${urlBase}/thread`, {
      message: message,
      doctorId: doctorId,
      patientId: patientId,
    });
    return res.data.thread;
  } catch (e) {
    throw e;
  }
};

export const getThreads = async () => {
  try {
    const res = await httpService.get(`${urlBase}/thread`);
    return res.data.threads;
  } catch (e) {
    throw e;
  }
};

export const getThread = async (id: string) => {
  try {
    const res = await httpService.get(`${urlBase}/thread/${id}`);
    return res.data.thread;
  } catch (e) {
    throw e;
  }
};

export const addMessage = async ({
  threadId,
  message,
  senderId,
  receiverId,
}: {
  threadId: string;
  message: string;
  senderId: string;
  receiverId: string;
}) => {
  try {
    const res = await httpService.post(`${urlBase}/thread/message`, {
      threadId: threadId,
      message: message,
      senderId: senderId,
      receiverId: receiverId,
    });
    return res.data.newMessage;
  } catch (e) {
    throw e;
  }
};

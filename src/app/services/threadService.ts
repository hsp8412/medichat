import httpService from "@/app/services/httpService";

const urlBase =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
    : process.env.NEXT_PUBLIC_API_BASE;
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

export const getMessages = async () => {
  try {
    const res = await httpService.get(`${urlBase}/users/message`);
    return res.data.messages;
  } catch (e) {
    throw e;
  }
};

export const closeThread = async (id: string) => {
  try {
    await httpService.delete(`${urlBase}/thread/${id}`);
  } catch (e) {
    throw e;
  }
};

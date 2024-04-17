import httpService from "@/app/services/httpService";

export type User = {
  id: string;
  username: string;
  avatarUrl: string | null;
  email: string;
  role: string;
  bio?: string;
  specialties?: string;
};
const urlBase = process.env.NEXT_PUBLIC_API_BASE;
export const getMe = async () => {
  const res = await fetch(`${urlBase}/auth/getUser`);
  const data = await res.json();
  return data.user;
};

export const getUsers = async () => {
  try {
    const res = await httpService.get(`${urlBase}/users`);
    return res.data.users;
  } catch (e) {
    throw e;
  }
};

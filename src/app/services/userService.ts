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
const urlBase =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_PRODUCTION_API_BASE}`
    : process.env.NEXT_PUBLIC_API_BASE;
export const getMe = async () => {
  try {
    const res = await httpService.get(`${urlBase}/auth/me`);
    return res.data.user;
  } catch (e) {
    throw e;
  }
};

export const getUsers = async () => {
  try {
    const res = await httpService.get(`${urlBase}/users`);
    return res.data.users;
  } catch (e) {
    throw e;
  }
};

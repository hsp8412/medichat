"use client";
import React, { useEffect } from "react";
import { getMe, User } from "@/app/services/userService";

const ProfileCard = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const fetchMe = async () => {
    try {
      const res = await getMe();
      setUser(res);
      setLoading(false);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-11/12 md:w-8/12">
      <p>Username: {user?.username}</p>
      <p>Role: {user?.role}</p>
      {user?.specialties && <p>Specialty: {user.specialties}</p>}
      <p>Email: {user?.email}</p>
      <p>Info: {user?.bio}</p>
    </div>
  );
};

export default ProfileCard;

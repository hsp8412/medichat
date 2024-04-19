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
    <div className="w-11/12 md:w-8/12 bg-white p-4 rounded-lg">
      <div className={"flex justify-center items-center lg:block"}>
        <img
          src={user?.avatarUrl || "headshot.jpg"}
          className={"rounded-full w-20 mb-2"}
        />
      </div>

      <p>
        <span className={"font-bold text-primary"}>Username:</span>{" "}
        {user?.username}
      </p>
      <p>
        <span className={"font-bold text-primary"}>Role:</span> {user?.role}
      </p>
      {user?.specialties && (
        <p>
          <span className={"font-bold text-primary"}>Specialty:</span>{" "}
          {user.specialties}
        </p>
      )}
      <p>
        {" "}
        <span className={"font-bold text-primary"}>Email:</span> {user?.email}
      </p>
      <p>
        <span className={"font-bold text-primary"}>Info:</span>
      </p>
      <p>{user?.bio}</p>
    </div>
  );
};

export default ProfileCard;

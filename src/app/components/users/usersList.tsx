"use client";
import React, { useEffect, useState } from "react";
import { getUsers, User } from "@/app/services/userService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import MyModal from "@/app/components/myModal";
import NewMessageForm from "@/app/components/newMessageForm";

type Props = {
  type: "doctor" | "patient";
};

const UsersList = ({ type }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const users: User[] = await getUsers();
      console.log(users);
      if (type === "doctor") {
        setUsers(users.filter((user) => user.role === "Doctor"));
      } else {
        setUsers(users.filter((user) => user.role === "Patient"));
      }
      setLoading(false);
    } catch (e) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [type]);

  console.log(users);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  let filteredUsers = users.filter((user) => user.role !== type);
  console.log(filteredUsers);

  return (
    <>
      <div className={"w-full flex justify-center my-6"}>
        <div className={"w-8/12 grid grid-cols-3 gap-3"}>
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={
                "bg-white p-4 flex flex-col justify-center items-center rounded h-full"
              }
            >
              <img
                src={"/headshot.jpg"}
                alt={"headshot"}
                className={"rounded-full w-24"}
              />
              <p className={"mt-3 text-2xl font-semibold text-primary"}>
                {user.username}
              </p>
              {user.specialties && (
                <p className={"text-lg text-neutral-600"}>{user.specialties}</p>
              )}
              <p className={"text-center "}>{user.bio}</p>
              <div className={"mt-3"}>
                <button
                  className={
                    "bg-primary text-white px-2 py-2 rounded hover:scale-110"
                  }
                  onClick={() => {
                    handleSelectUser(user);
                  }}
                >
                  <FontAwesomeIcon icon={faEnvelope} className={"me-2"} />
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MyModal open={openModal} setOpen={setOpenModal}>
        <NewMessageForm user={selectedUser} setModalOpen={setOpenModal} />
      </MyModal>
    </>
  );
};

export default UsersList;

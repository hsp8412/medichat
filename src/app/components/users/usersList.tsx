"use client";
import React, { useEffect, useState } from "react";
import { getUsers, User } from "@/app/services/userService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import MyModal from "@/app/components/users/myModal";
import NewMessageForm from "@/app/components/users/newMessageForm";
import Pagination from "@/app/components/pagi/pagination";
import _ from "lodash";

type Props = {
  type: "doctor" | "patient";
};

const UsersList = ({ type }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
    return <div className={"my-6"}>Loading...</div>;
  }

  let filteredUsers = users.filter((user) => user.role !== type);

  const pageSize = 6;
  const pageCount = Math.ceil(filteredUsers.length / pageSize);
  const paginated = _.chunk(filteredUsers, pageSize)[currentPage - 1];

  return (
    <>
      <div className={"w-full flex flex-col items-center gap-2 my-6"}>
        <div
          className={
            "w-11/12 md:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          }
        >
          {paginated.map((user) => (
            <div
              key={user.id}
              className={`${
                user.role === "Doctor" ? "h-[420px]" : "h-[400px]"
              }`}
            >
              <div
                className={
                  "bg-white p-4 flex flex-col justify-center items-center rounded h-full"
                }
              >
                <div className={"flex flex-col justify-center items-center"}>
                  <img
                    src={user?.avatarUrl || "/headshot.jpg"}
                    alt={"headshot"}
                    className={"rounded-full w-24"}
                  />
                  <p className={"mt-3 text-2xl font-semibold text-primary"}>
                    {user.username}
                  </p>
                  {user.specialties && (
                    <p className={"text-lg text-neutral-600"}>
                      {user.specialties}
                    </p>
                  )}
                  <p className={"text-center truncate-text-multiline"}>
                    {user.bio}
                  </p>
                </div>

                <div className={"mt-3 mt-auto"}>
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
            </div>
          ))}
        </div>
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <MyModal open={openModal} setOpen={setOpenModal}>
        <NewMessageForm user={selectedUser} setModalOpen={setOpenModal} />
      </MyModal>
    </>
  );
};

export default UsersList;

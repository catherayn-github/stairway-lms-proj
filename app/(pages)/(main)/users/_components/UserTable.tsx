"use client";
import React from "react";

import { ChevronsUpDown, Pencil, Trash } from "lucide-react";
import DeleteUserButton from "./DeleteUserButton";
import EditUserButton from "./EditUserButton";
import { useGetUsers } from "@app/_hooks/user.hook";

const UserTable = () => {
  const headers = ["Name", "Access", "Added By", "Date Added"];
  const { data: users } = useGetUsers();

  if (!users) {
    return <div>Loading...</div>;
  }
  return (
    <div className="border rounded-2xl">
      <table className="table-auto w-full text-left ">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="p-[1.6rem] font-semibold text-[#616161] text-[1.6rem]"
              >
                <div className="flex gap-[1.6rem]">
                  {header}
                  <ChevronsUpDown strokeWidth={1.5} color="#595959" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users!.map((user) => (
            <tr className="group hover:bg-[#BBCBD5] border-t ">
              <td className="p-[1.6rem] text-[1.6rem]">
                {user.last_name + ", " + user.first_name}
              </td>
              <td className="p-[1.6rem] text-[1.6rem]">{user.role}</td>
              <td className="p-[1.6rem] text-[1.6rem]">{user.added_by}</td>
              <td className="p-[1.6rem] text-[1.6rem]">
                {new Date(user.date_added).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </td>
              <td className="hidden group-hover:flex gap-[0.8rem] p-[1.6rem] ">
                <EditUserButton />
                <DeleteUserButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

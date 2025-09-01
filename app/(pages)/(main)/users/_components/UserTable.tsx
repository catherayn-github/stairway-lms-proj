"use client";

/* REACT */
import React from "react";

/* LIBRARIES */
import InfiniteScroll from "react-infinite-scroll-component";
import { ChevronsUpDown } from "lucide-react";

/* COMPONENTS */
import DeleteUserButton from "./DeleteUserButton";
import EditUserButton from "./EditUserButton";

/* HOOKS */
import { useGetUsers, useUserFilters } from "@app/_hooks/user.hook";


const UserTable = () => {
  const headers = ["Name", "Access", "Added By", "Date Added"];
  const [filters] = useUserFilters();
  const { data: users, fetchNextPage, hasNextPage } = useGetUsers({filters});

  const [{ sortName, sortDateAdded, sortAddedBy, sortAccess }, setSortFilters ] = useUserFilters();
  if (!users) {
    return <div>Loading...</div>;
  }
  const fetchedUsersCount = users.pages.reduce(
    (total, page) => total + page.result.length,
    0
  );

  return (
    <div
      className={`border rounded-2xl ${fetchedUsersCount > 50 ? "h-[70rem]" : "min-h-[5rem]"} overflow-auto`}
      id="scrollableDiv"
    >
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        dataLength={fetchedUsersCount}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<p className="text-center p-4">Loading...</p>}
        endMessage={<p className="text-center p-4">No more users</p>}
      >
        <table className="table-auto w-full text-left ">
          <thead className="">
            <tr>
              <th className="sticky top-0 bg-white z-10  p-[1.6rem] font-semibold text-[#616161] text-[1.6rem]">
                <div className="flex gap-[1.6rem]">
                  Name ({fetchedUsersCount})
                  <ChevronsUpDown strokeWidth={1.5} color="#595959" onClick={() => setSortFilters({sortName: sortName === "asc" ? "desc" : "asc"})}/>
                </div>
              </th>
              <th className="sticky top-0 bg-white z-10   p-[1.6rem] font-semibold text-[#616161] text-[1.6rem]">
                <div className="flex gap-[1.6rem]">
                  Access
                  <ChevronsUpDown strokeWidth={1.5} color="#595959" onClick={() => setSortFilters({sortAccess: sortAccess === "asc" ? "desc" : "asc"})} />
                </div>
              </th>
              <th className="sticky top-0 bg-white z-10   p-[1.6rem] font-semibold text-[#616161] text-[1.6rem]">
                <div className="flex gap-[1.6rem]">
                  Added By
                  <ChevronsUpDown strokeWidth={1.5} color="#595959" onClick={() => setSortFilters({sortAddedBy: sortAddedBy === "asc" ? "desc" : "asc"})}/>
                </div>
              </th>
                <th className="sticky top-0 bg-white z-10  p-[1.6rem] font-semibold text-[#616161] text-[1.6rem]">
                <div className="flex gap-[1.6rem]">
                  Date Added
                  <ChevronsUpDown strokeWidth={1.5} color="#595959" onClick={() => setSortFilters({sortDateAdded: sortDateAdded === "asc" ? "desc" : "asc"})}/>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page?.result?.map((user) => (
                  <tr className="group hover:bg-[#E7F5FF] border-t ">
                    <td className="p-[1.6rem] text-[1.6rem]">
                      {user.last_name + ", " + user.first_name}
                    </td>
                    <td className="p-[1.6rem] text-[1.6rem]">{user.role}</td>
                    <td className="p-[1.6rem] text-[1.6rem]">
                      {user.added_by}
                    </td>
                    <td className="p-[1.6rem] text-[1.6rem]">
                      {new Date(user.date_added).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </td>
                    <td className="hidden group-hover:flex gap-[0.8rem] p-[1.6rem] ">
                      <EditUserButton user={user} />
                      <DeleteUserButton user={user} />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        
      </InfiniteScroll>
    </div>
  );
};

export default UserTable;

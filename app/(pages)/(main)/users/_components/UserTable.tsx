"use client";

/* REACT */
import React from "react";

/* LIBRARIES */
import InfiniteScroll from "react-infinite-scroll-component";
import { ChevronDown, ChevronsDown, ChevronsUpDown } from "lucide-react";

/* SHADCN COMPONENTS */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@app/_components/ui/table";

/* COMPONENTS */
import DeleteUserButton from "./DeleteUserButton";
import EditUserButton from "./EditUserButton";

/* HOOKS */
import { useGetUsers, useUserFilters } from "@app/_hooks/user.hook";

const UserTable = () => {
    const [filters] = useUserFilters();
    const {
        data: users,
        fetchNextPage,
        hasNextPage,
    } = useGetUsers({ filters });
    const [
        { sortName, sortDateAdded, sortAddedBy, sortAccess },
        setSortFilters,
    ] = useUserFilters();

    if (!users) {
        return <div>Loading...</div>;
    }

    const fetchedUsersCount = users.pages.reduce(
        (total, page) => total + page.result.length,
        0
    );

    return (
        <div className="border rounded-2xl overflow-hidden bg-[#FDFDFD] flex-1">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50%]">
                            <div className="flex gap-[1.6rem] items-center">
                                Name ({users.pages[0].total})
                                <ChevronsUpDown
                                    strokeWidth={1.5}
                                    color="#595959"
                                    className="cursor-pointer "
                                    onClick={() =>
                                        setSortFilters({
                                            sortName:
                                                sortName === "asc"
                                                    ? "desc"
                                                    : "asc",
                                        })
                                    }
                                />
                            </div>
                        </TableHead>
                        <TableHead className="w-[15%] ">
                            <div className="flex gap-[1.6rem] items-center">
                                Access
                                <ChevronsUpDown
                                    strokeWidth={1.5}
                                    color="#595959"
                                    className="cursor-pointer"
                                    onClick={() =>
                                        setSortFilters({
                                            sortAccess:
                                                sortAccess === "asc"
                                                    ? "desc"
                                                    : "asc",
                                        })
                                    }
                                />
                            </div>
                        </TableHead>
                        <TableHead className="w-[15%] ">
                            <div className="flex gap-[1.6rem] items-center">
                                Added By
                                <ChevronsUpDown
                                    strokeWidth={1.5}
                                    color="#595959"
                                    className="cursor-pointer "
                                    onClick={() =>
                                        setSortFilters({
                                            sortAddedBy:
                                                sortAddedBy === "asc"
                                                    ? "desc"
                                                    : "asc",
                                        })
                                    }
                                />
                            </div>
                        </TableHead>
                        <TableHead className="w-[12%] ">
                            <div className="flex gap-[1.6rem] items-center">
                                Date Added
                                <ChevronsUpDown
                                    strokeWidth={1.5}
                                    color="#595959"
                                    className="cursor-pointer "
                                    onClick={() =>
                                        setSortFilters({
                                            sortDateAdded:
                                                sortDateAdded === "asc"
                                                    ? "desc"
                                                    : "asc",
                                        })
                                    }
                                />
                            </div>
                        </TableHead>
                        <TableHead className="w-[8%] "></TableHead>
                    </TableRow>
                </TableHeader>
            </Table>

            <div
                className={`custom-scrollbar ${
                    fetchedUsersCount > 10
                        ? "h-[calc(100vh-27rem)]"
                        : "min-h-[5rem]"
                } overflow-auto`}
                id="scrollableDiv"
            >
                <InfiniteScroll
                    scrollableTarget="scrollableDiv"
                    dataLength={fetchedUsersCount}
                    next={() => fetchNextPage()}
                    hasMore={!!hasNextPage}
                    loader={
                        <div className="text-center p-4 text-gray-500">
                            Loading more...
                        </div>
                    }
                >
                    <Table>
                        <TableBody>
                            {users.pages.map((page) =>
                                page?.result?.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        className="group hover:bg-[#E7F5FF] transition-colors border-t border-gray-100"
                                    >
                                        <TableCell className="w-[50%] ">
                                            {user.last_name +
                                                ", " +
                                                user.first_name}
                                        </TableCell>
                                        <TableCell className="w-[15%] p-[1.6rem] text-[1.6rem] align-middle">
                                            <div className="flex items-center gap-[0.8rem]">
                                                {user.role}
                                                <ChevronDown color="#595959" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="w-[15%] p-[1.6rem] text-[1.6rem] align-middle">
                                            {user.added_by}
                                        </TableCell>
                                        <TableCell className="w-[12%] p-[1.6rem] text-[1.6rem] align-middle">
                                            {new Date(
                                                user.date_added
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                            })}
                                        </TableCell>
                                        <TableCell className="w-[8%] p-[1.6rem] align-middle">
                                            <div className="opacity-0 group-hover:opacity-100 flex gap-[0.8rem] transition-opacity duration-200">
                                                <EditUserButton user={user} />
                                                <DeleteUserButton user={user} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default UserTable;

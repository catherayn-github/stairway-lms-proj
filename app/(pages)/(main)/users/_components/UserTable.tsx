"use client";

/* REACT */
import React from "react";

/* LIBRARIES */
import InfiniteScroll from "react-infinite-scroll-component";

/* ICONS */
import { ChevronsUpDown } from "lucide-react";

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
import UpdateAccessSelect from "./UpdateAccessSelect";
import { ZERO } from "@app/_constants";

const UserTable = () => {
    const [filters] = useUserFilters();
    const {
        data: users,
        fetchNextPage,
        hasNextPage,
    } = useGetUsers({ filters });
    const [
        { sort_name, sort_date_added, sort_added_by, sort_access },
        setSortFilters,
    ] = useUserFilters();

    if (!users) {
        return <div>Loading...</div>;
    }

    const fetchedUsersCount = users.pages.reduce(
        (total, page) => total + page.result.length,
        ZERO
    );

    return (
        <div
            id="scrollableDiv"
            className={`custom-scrollbar border rounded-2xl overflow-auto ${
                fetchedUsersCount > 50
                    ? "h-[calc(100vh-21rem)]"
                    : "min-h-[10rem]"
            }  bg-fill-primary-white `}
        >
            <InfiniteScroll
                style={{ height: "100%", overflow: "unset" }}
                scrollableTarget="scrollableDiv"
                dataLength={fetchedUsersCount}
                scrollThreshold={0.8}
                next={() => fetchNextPage()}
                hasMore={!!hasNextPage}
                loader={
                    <div className="text-center p-4 text-gray-500">
                        Loading more...
                    </div>
                }
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() =>
                                    setSortFilters({
                                        sort_name:
                                            sort_name === "asc"
                                                ? "desc"
                                                : "asc",
                                    })
                                }
                            >
                                <div className="flex gap-[1.6rem] items-center">
                                    Name ({users.pages[0].total})
                                    <ChevronsUpDown
                                        strokeWidth={1.5}
                                        className="cursor-pointer stroke-icon-default-black "
                                    />
                                </div>
                            </TableHead>
                            <TableHead
                                onClick={() =>
                                    setSortFilters({
                                        sort_access:
                                            sort_access === "asc"
                                                ? "desc"
                                                : "asc",
                                    })
                                }
                                className="cursor-pointer"
                            >
                                <div className="flex gap-[1.6rem] items-center">
                                    Access
                                    <ChevronsUpDown
                                        strokeWidth={1.5}
                                        className="stroke-icon-default-black"
                                    />
                                </div>
                            </TableHead>
                            <TableHead
                                onClick={() =>
                                    setSortFilters({
                                        sort_added_by:
                                            sort_added_by === "asc"
                                                ? "desc"
                                                : "asc",
                                    })
                                }
                                className="cursor-pointer"
                            >
                                <div className="flex gap-[1.6rem] items-center">
                                    Added By
                                    <ChevronsUpDown
                                        strokeWidth={1.5}
                                        className=" stroke-icon-default-black"
                                    />
                                </div>
                            </TableHead>
                            <TableHead
                                onClick={() =>
                                    setSortFilters({
                                        sort_date_added:
                                            sort_date_added === "asc"
                                                ? "desc"
                                                : "asc",
                                    })
                                }
                                className="cursor-pointer"
                            >
                                <div className="flex gap-[1.6rem] items-center">
                                    Date Added
                                    <ChevronsUpDown
                                        strokeWidth={1.5}
                                        className=" stroke-icon-default-black"
                                    />
                                </div>
                            </TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.pages.map((page) =>
                            page?.result?.map((user) => (
                                <TableRow
                                    key={user.id}
                                    className="group hover:bg-fill-highlight-lightest transition-colors border-t border-gray-100"
                                >
                                    <TableCell>
                                        {user.last_name +
                                            ", " +
                                            user.first_name}
                                    </TableCell>
                                    <TableCell className="p-[1.6rem] text-[1.6rem] align-middle">
                                        <UpdateAccessSelect user={user} />
                                    </TableCell>
                                    <TableCell className="p-[1.6rem] text-[1.6rem] align-middle">
                                        {user.added_by}
                                    </TableCell>
                                    <TableCell className="p-[1.6rem] text-[1.6rem] align-middle">
                                        {new Date(
                                            user.date_added
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                        })}
                                    </TableCell>
                                    <TableCell className="p-[1.6rem] align-middle">
                                        <div className="opacity-0 group-hover:opacity-100 flex gap-[0.8rem] transition-opacity duration-200">
                                            <EditUserButton user={user} />
                                            <DeleteUserButton user={user} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        {fetchedUsersCount === ZERO && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-[4rem] px-[1.6rem] text-[1.6rem] text-text-subtext-gray"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </TableBody>
                </Table>
            </InfiniteScroll>
        </div>
    );
};

export default UserTable;

"use client";

/* REACT */
import React from "react";

/* COMPONENTS */
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@app/_components/ui/select";
import { Separator } from "@app/components/ui/separator";
import AddUserButton from "./AddUserButton";

/* HOOKS */
import { useUserFilters } from "@app/_hooks/user.hook";

const UserHeader = () => {
    const user_roles = [
        "All",
        "Admin",
        "Student",
        "Instructor",
        "Contact Person",
    ];
    const [{ role }, setRoleFilter] = useUserFilters();

    return (
        <div className="flex justify-between">
            <h2 className="text-text-primary-black text-[1.8rem] font-bold py-[1.75rem]">
                Users
            </h2>

            <div className="flex items-center gap-[1.6rem]">
                <Select
                    value={role || "All"}
                    onValueChange={(value) =>
                        setRoleFilter({ role: value === "All" ? null : value })
                    }
                >
                    <SelectTrigger className="text-text-primary-black gap-[0.8rem]">
                        <SelectValue placeholder="All Users" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {user_roles.map((role) => (
                                <SelectItem
                                    key={role}
                                    value={role}
                                    className="text-icon-default-black text-[1.6rem]"
                                >
                                    {role}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Separator
                    orientation="vertical"
                    className="bg-stroke-gray h-1/3"
                />

                <AddUserButton />
            </div>
        </div>
    );
};

export default UserHeader;

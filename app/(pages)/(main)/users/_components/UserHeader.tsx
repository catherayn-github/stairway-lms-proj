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
    { label: "All", value: "All" },
    { label: "Admin", value: "Admin" },
    { label: "Student", value: "Student" },
    { label: "Instructor", value: "Instructor" },
    { label: "Contact Person", value: "Contact Person" },
  ];

  const [{role}, setRoleFilter] = useUserFilters();

  return (
    <div className="flex justify-between">
      <h2 className="text-[#303030] text-[1.8rem] font-bold py-[1.75rem]">Users</h2>

      <div className="flex items-center gap-[1.6rem]">
        <Select value={role || "All"} onValueChange={(value) => setRoleFilter({role: value === "All" ? null: value})}>
          <SelectTrigger  className="text-[#595959]">
            <SelectValue placeholder="All Users" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {user_roles.map((role) => (
                <SelectItem
                  key={role.value}
                  value={role.value}
                  className="text-[#595959] text-[1.6rem]"
                >
                  {role.label}
                
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* <Separator
          className="border-l mx-[1.6rem] h-[1.6rem] border-[#BBCBD5]"
        /> */}

        <Separator orientation="vertical" className="bg-[#BBCBD5] h-1/3" />
          
        <AddUserButton/>
      </div>
    </div>
  );
};

export default UserHeader;

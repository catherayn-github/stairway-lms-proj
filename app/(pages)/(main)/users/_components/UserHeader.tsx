import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@app/_components/ui/select";
import { Separator } from "@app/components/ui/separator";

import React from "react";
import AddUserButton from "./AddUserButton";

const UserHeader = () => {
  const user_roles = [
    { label: "All", value: "all" },
    { label: "Admin", value: "admin" },
    { label: "Student", value: "student" },
    { label: "Instructor", value: "instructor" },
    { label: "Contact Person", value: "contact_person" },
  ];
  return (
    <div className="flex justify-between">
      <h2 className="text-[#303030] text-[1.8rem] font-bold py-[1.75rem]">Users</h2>

      <div className="flex items-center gap-[1.6rem]">
        <Select>
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
                  {/* {selected === role.value && (
                      <Check className="h-4 w-4 text-green-600" />
                    )} */}
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

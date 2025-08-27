import { Button } from "@app/_components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@app/_components/ui/dialog";

import { Pencil, User } from "lucide-react";
import React from "react";
import UserForm from "./UserForm";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@app/_components/ui/select";

const EditUserButton = () => {
  const user_roles = [
    { label: "All", value: "all" },
    { label: "Admin", value: "admin" },
    { label: "Student", value: "student" },
    { label: "Instructor", value: "instructor" },
    { label: "Contact Person", value: "contact_person" },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil
          strokeWidth={2.75}
          className="p-[0.3rem] cursor-pointer"
          color="#595959"
        />
      </DialogTrigger>
      <DialogContent className="rounded-[2.4rem] min-w-[60rem]  ">
        <DialogHeader className="border-b border-[#BBCBD5] px-[3.2rem] py-[2.4rem]">
          <DialogTitle className="text-[1.8rem] text-[#303030]">
            Edit User
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col">
          <div className="flex gap-[2.4rem] px-[3.2rem] pt-[3.2] pb-[2.4rem]">
            <div className="flex flex-col gap-[1.6rem]">
              <label
                htmlFor="firstName"
                className="text-[#616161] text-[1.6rem]"
              >
                First Name{" "}
                <span className="text-[#D83A52] text-[1.6rem]">*</span>
              </label>

              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                className="border border-[#BBCBD5] rounded-[0.8rem] px-[1.6rem] py-[1.1rem]"
              />
            </div>

            <div className="flex flex-col gap-[1.6rem]">
              <label htmlFor="lastName">
                Last Name{" "}
                <span className="text-[#D83A52] text-[1.6rem]">*</span>
              </label>

              <input
                id="lasttName"
                type="text"
                placeholder="Last Name"
                className="border border-[#BBCBD5] rounded-[0.8rem] px-[1.6rem] py-[1.1rem]"
              />
            </div>

            <div className="flex flex-col gap-[1.6rem]">
              <label htmlFor="access">
                Access <span className="text-[#D83A52] text-[1.6rem]">*</span>
              </label>
              <Select>
                <SelectTrigger className="text-[#595959]">
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
            </div>
          </div>

          <div className="flex flex-col gap-[1.6rem] px-[3.2rem] pb-[3.2rem]">
            <label htmlFor="email" className="text-[#616161] text-[1.6rem]">
              Email<span className="text-[#D83A52] text-[1.6rem]">*</span>
            </label>

            <input
              id="firstName"
              type="text"
              placeholder="Type email here..."
              className="border border-[#BBCBD5] rounded-[0.8rem] px-[1.6rem] py-[1.1rem]"
            />
          </div>

          <DialogFooter className="bg-[#E7F5FF] p-[3.2rem] gap-[2.4rem] rounded-b-[2.4rem]">
            <DialogClose className="text-[#1E76EC] text-[1.6rem]">
              Cancel
            </DialogClose>
            <button
              type="submit"
              className="rounded-[0.8rem] bg-[#1E76EC] px-[5.45rem] py-[1.85rem] text-[#FDFDFD] font-bold text-[1.6rem]"
            >
              Update
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserButton;

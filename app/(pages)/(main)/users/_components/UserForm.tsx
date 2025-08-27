import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/_components/ui/select";
const UserForm = () => {
     const user_roles = [
    { label: "All", value: "all" },
    { label: "Admin", value: "admin" },
    { label: "Student", value: "student" },
    { label: "Instructor", value: "instructor" },
    { label: "Contact Person", value: "contact_person" },
  ];
  return (
    <form className="max-w-sm mx-auto p-4 border rounded-lg shadow-sm space-y-4">
      <label htmlFor="firstName">
        First Name <span className="text-red-500">*</span>
      </label>

      <input id="firstName" type="text" />

      <label htmlFor="lastName">
        Last Name <span className="text-red-500">*</span>
      </label>

      <input id="lasttName" type="text" />

      <label htmlFor="access">
        Access <span className="text-red-500">*</span>
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

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default UserForm;

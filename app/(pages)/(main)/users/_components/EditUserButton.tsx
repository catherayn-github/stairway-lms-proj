"use client";
/* PLUGINS */
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

/* REACT / HOOKS */
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

/* COMPONENTS */
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@app/_components/ui/dialog";
import { Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/_components/ui/select";
import { Input } from "@app/_components/ui/input";

/* HOOKS */
import { useEditUser } from "@app/_hooks/user.hook";

/* ENTITIES / TYPES */
import { User } from "@app/_entities/interface/user.interface";
import { EditUserData } from "@app/_entities/types/user.type";
import { RoleType } from "@app/_entities/enum/role.enum";

/* SCHEMAS */
import { edit_user_schema } from "@app/_schema/user.schema";

interface Props {
  user: User;
}
const EditUserButton = ({ user }: Props) => {
  const user_roles = [
    { label: "Admin", value: "Admin" },
    { label: "Student", value: "Student" },
    { label: "Instructor", value: "Instructor" },
    { label: "Contact Person", value: "Contact Person" },
  ];

  const [is_edit_user_modal_open, setEditUserModal] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<EditUserData>({
    resolver: zodResolver(edit_user_schema),
  });
  const { editUser } = useEditUser({
    onSuccess() {
      setEditUserModal(false);
      toast.success("User edited successfully");
      reset();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onSubmit: SubmitHandler<EditUserData> = (data) => {
    editUser({ data });
  };

  useEffect(() => {
    reset(user);
  }, [reset, user]);

  return (
    <Dialog
      open={is_edit_user_modal_open}
      onOpenChange={(open) => {
        setEditUserModal(open);
        if (!open) {
          reset(user);
        }
      }}
    >
      <DialogTrigger asChild>
        <Pencil
          strokeWidth={1.75}
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
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
          id="edit_user_form"
        >
          <div className="flex gap-[2.4rem] px-[3.2rem] pt-[3.2rem] pb-[2.4rem]">
            <div className="flex flex-col gap-[1.6rem]">
              <label
                htmlFor="firstName"
                className="text-[#616161] text-[1.6rem]"
              >
                First Name{" "}
                <span className="text-[#D83A52] text-[1.6rem]">*</span>
              </label>

              <Input
                {...register("first_name")}
                error={errors.first_name?.message}
                placeholder="First Name"
                className="border border-[#BBCBD5] rounded-[0.8rem] px-[1.6rem] py-[1.1rem]"
              />
            </div>

            <div className="flex flex-col gap-[1.6rem]">
              <label htmlFor="lastName">
                Last Name{" "}
                <span className="text-[#D83A52] text-[1.6rem]">*</span>
              </label>

              <Input
                {...register("last_name")}
                error={errors.last_name?.message}
                placeholder="Last Name"
                className="border border-[#BBCBD5] rounded-[0.8rem] px-[1.6rem] py-[1.1rem]"
              />
            </div>

            <div className="flex flex-col gap-[1.6rem]">
              <label htmlFor="access">
                Access <span className="text-[#D83A52] text-[1.6rem]">*</span>
              </label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="text-[#595959]">
                      <SelectValue placeholder="Select Access" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {user_roles.map((role) => (
                          <SelectItem
                            key={role.value}
                            value={role.value as RoleType}
                            className="text-[#595959] text-[1.6rem]"
                          >
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.role && (
                <p className="text-destructive mt-1 text-sm">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[1.6rem] px-[3.2rem] pb-[3.2rem]">
            <label htmlFor="email" className="text-[#616161] text-[1.6rem]">
              Email<span className="text-[#D83A52] text-[1.6rem]">*</span>
            </label>

            <Input
              {...register("email")}
              error={errors.email?.message}
              placeholder="Type email here..."
              className="border border-[#BBCBD5] rounded-[0.8rem] px-[1.6rem] py-[1.1rem] w-full"
            />
          </div>
        </form>
        <DialogFooter className="bg-[#E7F5FF] p-[3.2rem] gap-[2.4rem] rounded-b-[2.4rem]">
          <button
            type="button"
            className="text-[#1E76EC] text-[1.6rem]"
            onClick={() => setEditUserModal(false)}
          >
            Cancel
          </button>
          <button
            form="edit_user_form"
            type="submit"
            className="rounded-[0.8rem] bg-[#1E76EC] px-[5.45rem] py-[1.85rem] text-[#FDFDFD] font-bold text-[1.6rem]"
          >
            Update
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserButton;

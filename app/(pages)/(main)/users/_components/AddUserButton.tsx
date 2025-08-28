"use client";
import { Button } from "@app/_components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  Dialog,
  DialogDescription,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@app/_components/ui/dialog";
import { Input } from "@app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/_components/ui/select";
import { AddUserData } from "@app/_entities/types/user.type";
import { useAddUser } from "@app/_hooks/user.hook";
import { add_user_schema } from "@app/_schema/user.schema";
import useUserStore from "@app/_stores/useUserStore";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import toast from "react-hot-toast";

const AddUserButton = () => {
  const is_add_user_modal_open = useUserStore.use.is_add_user_modal_open();
  const setAddUserModal = useUserStore.use.setAddUserModal();

  const user_roles = [
    { label: "All", value: "All" },
    { label: "Admin", value: "Admin" },
    { label: "Student", value: "Student" },
    { label: "Instructor", value: "Instructor" },
    { label: "Contact Person", value: "Contact_person" },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AddUserData>({
    resolver: zodResolver(add_user_schema),
  });

  const { addUser } = useAddUser({
    onSuccess() {
      setAddUserModal(false);
      toast.success("User added successfully");
      reset();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onSubmit: SubmitHandler<AddUserData> = (data) => {
   
    addUser({ data });
    
  };
  return (
    <Dialog
      open={is_add_user_modal_open}
      onOpenChange={(open) => {
        setAddUserModal(open);
        if (!open) {
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <button className="flex px-[3.613rem] py-[1.2rem] bg-[#1E76EC] text-[1.6rem] text-[#FDFDFD] font-bold rounded-[0.8rem]">
          Add User
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-[2.4rem] min-w-[60rem]  ">
        <DialogHeader className="border-b border-[#BBCBD5] px-[3.2rem] py-[2.4rem]">
          <DialogTitle className="text-[1.8rem] text-[#303030]">
            Add User
          </DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
          id="add_user_form"
        >
          <div className="flex gap-[2.4rem] px-[3.2rem] pt-[3.2] pb-[2.4rem]">
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
                placeholder="Last Name"
                error={errors.last_name?.message}
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
              className="border border-[#BBCBD5] rounded-[0.8rem] px-[1.6rem] py-[1.1rem]"
            />
          </div>
        </form>
        <DialogFooter className="bg-[#E7F5FF] p-[3.2rem] gap-[2.4rem] rounded-b-[2.4rem]">
          <DialogClose className="text-[#1E76EC] text-[1.6rem]">
            Cancel
          </DialogClose>
          <button
            form="add_user_form"
            type="submit"
            className="rounded-[0.8rem] bg-[#1E76EC] px-[5.45rem] py-[1.85rem] text-[#FDFDFD] font-bold text-[1.6rem]"
          >
            Add
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserButton;

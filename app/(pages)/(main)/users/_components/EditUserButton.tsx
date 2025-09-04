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
import { Button } from "@app/_components/ui/button";
import { selectRoleOptions } from "@app/_constants/select_options";

interface Props {
    user: User;
}
const EditUserButton = ({ user }: Props) => {
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
                    className="p-[0.3rem] cursor-pointer stroke-icon-default-black"
                />
            </DialogTrigger>
            <DialogContent className="rounded-[2.4rem] min-w-[60rem]  ">
                <DialogHeader className="border-b border-stroke-gray px-[3.2rem] py-[2.4rem]">
                    <DialogTitle className="text-[1.8rem] text-text-primary-black">
                        Edit User
                    </DialogTitle>
                </DialogHeader>
                <form
                    className="flex flex-col"
                    onSubmit={handleSubmit(onSubmit)}
                    id="edit_user_form"
                >
                    <div className="flex gap-[2.4rem] px-[3.2rem] pt-[3.2rem] pb-[2.4rem]">
                        <div className="flex flex-col gap-[1.6rem] min-w-[1rem]">
                            <label
                                htmlFor="firstName"
                                className="text-text-subtext-gray text-[1.6rem]"
                            >
                                First Name
                                <span className="text-status-error-red text-[1.6rem]">
                                    *
                                </span>
                            </label>

                            <Input
                                {...register("first_name")}
                                error={errors.first_name?.message}
                                placeholder="First Name"
                                className="px-[1.6rem] py-[1.1rem]"
                            />
                        </div>

                        <div className="flex flex-col gap-[1.6rem] min-w-[15.1rem]">
                            <label
                                htmlFor="lastName"
                                className="text-text-subtext-gray text-[1.6rem]"
                            >
                                Last Name
                                <span className="text-status-error-red">*</span>
                            </label>

                            <Input
                                {...register("last_name")}
                                error={errors.last_name?.message}
                                placeholder="Last Name"
                                className="px-[1.6rem] py-[1.1rem]"
                            />
                        </div>

                        <div className="flex flex-col gap-[1.6rem]  ">
                            <label
                                htmlFor="access"
                                className="text-text-subtext-gray text-[1.6rem]"
                            >
                                Access{" "}
                                <span className="text-status-error-red text-[1.6rem]">
                                    *
                                </span>
                            </label>
                            <Controller
                                control={control}
                                name="role"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <div
                                            className={`border rounded-[0.8rem] ${
                                                errors.role
                                                    ? "border-status-error-red"
                                                    : "border-stroke-gray"
                                            } `}
                                        >
                                            <SelectTrigger className="px-[1.6rem] py-[1.1rem] min-w-[18.5rem] text-icon-default-black gap-[2.7rem]">
                                                <SelectValue placeholder="Select Access" />
                                            </SelectTrigger>
                                        </div>
                                        <SelectContent>
                                            <SelectGroup>
                                                {selectRoleOptions.map(
                                                    (role) => (
                                                        <SelectItem
                                                            key={role}
                                                            value={role}
                                                            className="text-icon-default-black text-[1.6rem]"
                                                        >
                                                            {role}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            {errors.role && (
                                <p className="text-status-error-red mt-[0.8rem] text-[1.6rem]">
                                    {errors.role.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[1.6rem] px-[3.2rem] pb-[3.2rem]">
                        <label
                            htmlFor="email"
                            className="text-text-subtext-gray text-[1.6rem]"
                        >
                            Email
                            <span className="text-status-error-red">*</span>
                        </label>

                        <Input
                            {...register("email")}
                            error={errors.email?.message}
                            placeholder="Type email here..."
                            className="px-[1.6rem] py-[1.1rem] w-full"
                        />
                    </div>
                </form>
                <DialogFooter className="bg-fill-highlight-lightest p-[3.2rem] gap-[2.4rem] rounded-b-[2.4rem]">
                    <Button
                        type="button"
                        className="text-fill-primary  py-[1.85rem] text-[1.6rem] bg-transparent"
                        onClick={() => setEditUserModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        form="edit_user_form"
                        type="submit"
                        className="rounded-[0.8rem] px-[4.25rem] py-[1.85rem] text-fill-primary-white font-bold "
                    >
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserButton;

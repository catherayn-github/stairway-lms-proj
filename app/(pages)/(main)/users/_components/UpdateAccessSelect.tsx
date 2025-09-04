"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@app/_components/ui/select";
import { useEditUser } from "@app/_hooks/user.hook";
import { User } from "@app/_entities/interface/user.interface";
import { RoleType } from "@app/_entities/enum/role.enum";
import toast from "react-hot-toast";
import { selectRoleOptions } from "@app/_constants/select_options";

interface Props {
    user: User;
}

const UpdateAccessSelect = ({ user }: Props) => {
    const { control, reset } = useForm<{ role: RoleType }>({
        defaultValues: { role: user.role as RoleType },
    });

    const { editUser } = useEditUser({
        onSuccess() {
            toast.success("User role updated");
            reset({ role: user.role as RoleType });
        },
        onError(error) {
            toast.error(error);
        },
    });

    useEffect(() => {
        reset({ role: user.role as RoleType });
    }, [user, reset]);

    return (
        <Controller
            control={control}
            name="role"
            render={({ field }) => (
                <Select
                    value={field.value}
                    onValueChange={(val) => {
                        const role = val as RoleType;
                        field.onChange(role);
                        editUser({
                            data: {
                                id: user.id,
                                role,
                            },
                        });
                    }}
                >
                    <SelectTrigger className="text-icon-default-black gap-[0.8rem]">
                        <SelectValue placeholder="Select Access" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {selectRoleOptions.map((role) => (
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
            )}
        />
    );
};

export default UpdateAccessSelect;

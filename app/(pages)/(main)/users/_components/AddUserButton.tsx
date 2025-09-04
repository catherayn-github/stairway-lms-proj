"use client";
/* PLUGINS */
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

/* REACT / HOOKS */
import { useForm, SubmitHandler, Controller } from "react-hook-form";

/* COMPONENTS */
import {
    Dialog,
    DialogHeader,
    DialogFooter,
    DialogTrigger,
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

/* HOOKS */
import { useAddUser } from "@app/_hooks/user.hook";

/* STORES */
import useUserStore from "@app/_stores/useUserStore";

/* ENTITIES / TYPES */
import { AddUserData } from "@app/_entities/types/user.type";

/* SCHEMAS */
import { add_user_schema } from "@app/_schema/user.schema";
import { Button } from "@app/_components/ui/button";
import { selectRoleOptions } from "@app/_constants/select_options";

const AddUserButton = () => {
    const is_add_user_modal_open = useUserStore.use.is_add_user_modal_open();
    const setAddUserModal = useUserStore.use.setAddUserModal();

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
                <Button className="flex px-[3.613rem] py-[1.2rem] bg-fill-primary text-[1.6rem] text-fill-primary-white font-bold rounded-[0.8rem]">
                    Add User
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2.4rem] min-w-[60rem]  ">
                <DialogHeader className="border-b border-stroke-gray px-[3.2rem] py-[2.4rem]">
                    <DialogTitle className="text-[1.8rem] text-text-primary-black">
                        Add User
                    </DialogTitle>
                </DialogHeader>
                <form
                    className="flex flex-col"
                    onSubmit={handleSubmit(onSubmit)}
                    id="add_user_form"
                >
                    <div className="flex gap-[2.4rem] px-[3.2rem] pt-[3.2rem] pb-[2.4rem]">
                        <div className="flex flex-col gap-[1.6rem]">
                            <label
                                htmlFor="firstName"
                                className="text-text-subtext-gray text-[1.6rem]"
                            >
                                First Name
                                <span className="text-status-error-red ">
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

                        <div className="flex flex-col gap-[1.6rem]">
                            <label
                                htmlFor="lastName"
                                className="text-text-subtext-gray text-[1.6rem]"
                            >
                                Last Name
                                <span className="text-status-error-red ">
                                    *
                                </span>
                            </label>

                            <Input
                                {...register("last_name")}
                                placeholder="Last Name"
                                error={errors.last_name?.message}
                                className=" px-[1.6rem] py-[1.1rem] text-[1.6rem]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="access"
                                className="mb-[1.6rem] text-text-subtext-gray text-[1.6rem]"
                            >
                                Access
                                <span className="text-status-error-red">*</span>
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
                                            className={`text-icon-default-black border rounded-[0.8rem] ${
                                                errors.role
                                                    ? "border-status-error-red"
                                                    : "border-stroke-gray"
                                            } border-stroke-gray `}
                                        >
                                            <SelectTrigger className="px-[1.6rem] py-[1.1rem] min-w-[18.5rem] gap-[2.7rem]">
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
                                <p className="text-status-error-red text-[1.6rem] mt-[0.8rem]">
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
                            <span className="text-status-error-red text-[1.6rem]">
                                *
                            </span>
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
                    <DialogClose className="text-fill-primary text-[1.6rem]">
                        Cancel
                    </DialogClose>
                    <Button
                        form="add_user_form"
                        type="submit"
                        className="rounded-[0.8rem] bg-fill-primary px-[5.45rem] py-[1.85rem] text-fill-primary-white font-bold text-[1.6rem]"
                    >
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddUserButton;

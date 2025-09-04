/* PLUGINS */
import toast from "react-hot-toast";

/* REACT / HOOKS */
import { useState } from "react";

/* COMPONENTS */
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@app/_components/ui/alert-dialog";

/* ICONS */
import { Trash, X } from "lucide-react";

/* ENTITIES / TYPES */
import { User } from "@app/_entities/interface/user.interface";

/* HOOKS */
import { useDeleteUser } from "@app/_hooks/user.hook";

interface Props {
    user: User;
}
const DeleteUserButton = ({ user }: Props) => {
    const [is_delete_user_modal_open, setDeleteUserModal] = useState(false);
    const { deleteUser } = useDeleteUser({
        onSuccess() {
            setDeleteUserModal(false);
            toast.success("User deleted successfully");
        },
        onError(error) {
            toast.error(error);
        },
    });
    return (
        <AlertDialog
            open={is_delete_user_modal_open}
            onOpenChange={(open) => {
                setDeleteUserModal(open);
            }}
        >
            <AlertDialogTrigger asChild>
                <Trash
                    strokeWidth={1.75}
                    className="p-[0.3rem] cursor-pointer stroke-icon-default-black"
                />
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[2.4rem] min-w-[40.5rem] ">
                <AlertDialogHeader>
                    <AlertDialogCancel className="absolute top-[1.7rem] right-[2.4rem] rounded p-1 hover:bg-gray-100 stroke-icon-default-gray">
                        <X strokeWidth={1.5} />
                    </AlertDialogCancel>
                    <AlertDialogTitle className="text-[1.8rem] text-text-primary-black border-b px-[2.4rem] py-[1.6rem]">
                        Delete User Permanently?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[1.6rem] text-text-primary-black p-[2.4rem]">
                        This user’s data can’t be recovered. Continue?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="bg-fill-highlight-lightest p-[2.4rem] gap-[2.4rem] rounded-b-[2.4rem]">
                    <AlertDialogCancel className=" text-[1.6rem] bg-transparent text-fill-primary">
                        No, Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-status-error-red font-bold text-[1.6rem] py-[2.4rem] px-[2.9rem] rounded-[0.8rem]"
                        onClick={() => {
                            deleteUser({
                                id: user.id,
                            });
                        }}
                    >
                        Yes, Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteUserButton;

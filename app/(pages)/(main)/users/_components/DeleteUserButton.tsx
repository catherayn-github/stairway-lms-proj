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
import { Button } from "@app/_components/ui/button";
import { useDeleteUser } from "@app/_hooks/user.hook";
import { Trash, X } from "lucide-react";
import { User } from "next-auth";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  user : User
}
const DeleteUserButton = ({user} : Props) => {
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
          strokeWidth={2.75}
          className="p-[0.3rem] cursor-pointer"
          color="#595959"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-[2.4rem] min-w-[40.5rem] ">
        <AlertDialogHeader>
          <AlertDialogCancel className="absolute top-[1.7rem] right-[2.4rem] rounded p-1 hover:bg-gray-100">
            <X strokeWidth={1.5} color="#BCC7CF" />
          </AlertDialogCancel>
          <AlertDialogTitle className="text-[1.8rem] text-[#303030] border-b px-[2.4rem] py-[1.6rem]">
            Delete User Permanently?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[1.6rem] text-[#303030] p-[2.4rem]">
            This user’s data can’t be recovered. Continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-[#E7F5FF] p-[2.4rem] gap-[2.4rem] rounded-b-[2.4rem]">
          <AlertDialogCancel className=" text-[1.6rem] bg-transparent text-[#1E76EC]">
            No, Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#D83A52] font-bold text-[1.6rem] py-[2.4rem] px-[2.9rem] rounded-[0.8rem]"
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

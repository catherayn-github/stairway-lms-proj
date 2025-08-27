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
import { Trash, X } from "lucide-react";
import React from "react";

const DeleteUserButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash
          strokeWidth={2.75}
          className="p-[0.3rem] cursor-pointer" color="#595959"
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
          <AlertDialogAction className="bg-[#D83A52] font-bold text-[1.6rem] py-[2.4rem] px-[2.9rem] rounded-[0.8rem]">
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserButton;

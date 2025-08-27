import React from "react";
import UserHeader from "./_components/UserHeader";
import UserTable from "./_components/UserTable";

const UserPage = () => {
  return (
    <div className="flex flex-col gap-[2.4rem]">
      <UserHeader />
      <UserTable />
    </div>
  );
};

export default UserPage;

import { Bell, Search } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@app/_components/ui/avatar";
const Header = () => {
  return (
    <header className="flex justify-between items-center py-[1.6rem] px-[2.4rem] bg-[#FDFDFD] border-b-[0.1rem] border-[#BBCBD5]">
      <div className="relative">
        <Search
          className="absolute top-1/2 left-[1.6rem] -translate-y-1/2 w-[2.4rem] h-[2.4rem] mr-[0.8rem]"
          color="#BCC7CF"
        />
        <input
          type="text"
          placeholder="Search"
          className="rounded-[0.8rem] text-[1.6rem] border-[0.1rem] border-[#BBCBD5] pl-[4.8rem] py-[0.8rem] min-w-[30rem]"
        />
      </div>

      <div className="flex gap-[1.6rem]">
        <Bell color="#595959" className="top-1/2 my-[0.8rem]"/>

       <Avatar className="min-w-[4.3rem] min-h-[4rem]">
        <AvatarImage src="/assets/profile.png" alt="Profile Picture" />
        <AvatarFallback>PFP</AvatarFallback>
      </Avatar>
      
      </div>
    </header>
  );
};

export default Header;

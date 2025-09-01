"use client";
import { Bell, Search } from "lucide-react";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useUserFilters } from "@app/_hooks/user.hook";
import { TIMEOUT_SPEED } from "@app/_constants";
import { Input } from "@app/_components/ui/input";
import AvatarDropdown from "@app/(pages)/(main)/users/_components/AvatarDropdown";
const Header = () => {
  const [{ search }, setSearchFilters] = useUserFilters();
  const debounced = useDebouncedCallback((value) => {
    setSearchFilters({
      search: value || null,
    });
  }, TIMEOUT_SPEED.normal);
  const [search_input, setSearchInput] = useState(search);

  return (
    <header className="flex justify-between items-center py-[1.6rem] px-[2.4rem] bg-[#FDFDFD] border-b-[0.1rem] border-[#BBCBD5]">
      <div className="relative">
        <Search
          className="absolute top-1/2 left-[1.6rem] -translate-y-1/2 w-[2.4rem] h-[2.4rem] mr-[0.8rem]"
          color="#BCC7CF"
        />
        <Input
          id="search_user"
          type="text"
          placeholder="Search"
          value={search_input || ""}
          onChange={(event) => {
            debounced(event.target.value);
            setSearchInput(event.target.value);
          }}
          className="rounded-[0.8rem] text-[1.6rem] border-[0.1rem] border-[#BBCBD5] pl-[4.8rem] py-[0.8rem] min-w-[30rem]"
        />
      </div>

      <div className="flex gap-[1.6rem]">
        <Bell color="#595959" className="top-1/2 my-[0.8rem]" />

        <AvatarDropdown/>
      </div>
    </header>
  );
};

export default Header;

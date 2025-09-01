"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@app/_components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AvatarDropdown = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Avatar
        className="cursor-pointer min-w-[4.3rem] min-h-[4rem]"
        onClick={() => setOpen(!open)}
      >
        <AvatarImage src="/assets/profile.png" alt="Profile Picture" />
        <AvatarFallback>PFP</AvatarFallback>
      </Avatar>

      {open && (
        <div className="absolute right-0 mt-2 p-[2.4rem] min-w-[18.8rem]  bg-white border rounded-[0.8rem]  shadow-lg z-50">
          <Link href="/api/auth/signout" onClick={handleLogout}>
            <button className="text-bold text-white text-[1.6rem] bg-[#D83A52] px-[1.6rem] py-[0.8rem] w-full rounded-[0.8rem]">
              Log out
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;

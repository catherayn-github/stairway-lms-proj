import Image from "next/image";
import React from "react";
import Logo from "@public/assets/stairway-logo.png";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  return (
    <div className="flex flex-col gap-[4.1rem]">
      <Image
        src={Logo}
        alt="Stairway Logo"
        width={248}
        height={62}
        className="mx-[3.9rem]"
      />
      <form className="flex flex-col">
        <label
          htmlFor="email"
          className="text-[#616161] text-[1.6rem] mb-[1.6rem]"
        >
          Email
        </label>
        <input
          id="email"
          type="text"
          placeholder="johndoe@gmail.com"
          className="py-[1.1rem] font- pl-[1.6rem] border-[0.1rem] border-[#BBCBD5] rounded-[0.8rem] min-w-[32.6rem] text-[1.6rem] mb-[2.4rem]"
        />
        <label htmlFor="password" className="text-[#616161] text-[1.6rem] mb-[1.6rem]">
          Password
        </label>
        <div className="relativ mb-[2.4rem]">
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="py-[1.1rem] font- pl-[1.6rem] border-[0.1rem] border-[#BBCBD5] rounded-[0.8rem] min-w-[32.6rem] text-[1.6rem]"
          />
          <Eye className="w-[1.5rem] h-[1rem] absolute right-[1.6rem] top-1/2 -translate-y-1/2" color="#BCC7CF" />
          {/* <EyeOff className="w-[1.5rem] h-[1rem]" color="#BCC7CF"/> */}
        </div>

        <button type="submit" className="bg-[#1E76EC] text-white rounded-[0.8rem] py-[1.2rem] font-bold">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

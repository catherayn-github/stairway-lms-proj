"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Logo from "@public/assets/stairway-logo.png";
import { login_schema, LoginFormData } from "@app/_schema/auth.schema";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const LoginForm = () => {
  
  const router = useRouter();
  const { register, handleSubmit, setError } = useForm<LoginFormData>({
    resolver: zodResolver(login_schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (response?.error) {
      if (response.error === "Invalid Login Credentials.") {
        setError("password", { type: "custom", message: response.error });
      } else {
        toast.error(response.error);
      }
    }

    if (response?.ok && !response?.error) {
      if (response?.ok) {
        router.push("/users");
      }
    }
  };

  return (
    <div className="flex flex-col gap-[4.1rem]">
      <Image
        src={Logo}
        alt="Stairway Logo"
        width={248}
        height={62}
        className="mx-[3.9rem]"
      />

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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
          {...register("email_address")}
        />

        <label
          htmlFor="password"
          className="text-[#616161] text-[1.6rem] mb-[1.6rem]"
        >
          Password
        </label>
        <div className="relative mb-[2.4rem]">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="py-[1.1rem] font- pl-[1.6rem] border-[0.1rem] border-[#BBCBD5] rounded-[0.8rem] min-w-[32.6rem] text-[1.6rem]"
            {...register("password")}
          />
          <Eye
            className="w-[1.5rem] h-[1rem] absolute right-[1.6rem] top-1/2 -translate-y-1/2 cursor-pointer"
            color="#BCC7CF"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <button
          type="submit"
          className="bg-[#1E76EC] text-white rounded-[0.8rem] py-[1.2rem] font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

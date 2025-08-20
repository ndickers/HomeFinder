"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { HelperText } from "flowbite-react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useForm, SubmitHandler } from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { poppins } from "@/components/ui/font";
import { forgotPassSchema } from "../formSchema";
import Link from "next/link";

type Inputs = {
  email: string;
};
export default function page() {
  const [passVisibility, setPassVisibility] = useState("password");
  const [conPassVisibility, setConPassVisibility] = useState("password");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(forgotPassSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };
  return (
    <div className={`${poppins.className} bg-[#FEF7F2] h-[100vh] pt-10 `}>
      <div className="lg:flex lg:items-center lg:max-w-[50rem] lg:mx-auto lg:my-auto">
        <Image
          src="/assets/home-login.jpg"
          alt="login page pic"
          width={400}
          height={400}
          className="lg:flex-1 hidden lg:block object-cover lg:h-[550px]"
        />
        <div className="px-3 md:max-w-[30rem] lg:max-w-none  mx-auto lg:ml-0 lg:flex-1">
          <Image
            className="w-[70px] md:w-[80px] mx-auto lg:w-[90px] h-auto"
            src={"/assets/homeFinderLogo.png"}
            alt="home finder logo"
            width={100}
            height={100}
          />
          <h1 className="font-medium text-xl mt-6 mb-6 lg:mt-0 lg:mb-2 text-center">
            Forget Password
          </h1>

          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="text-[0.65rem] lg:py-0.5 font-medium"
              >
                Email address
              </label>
              <Input
                id="email"
                {...register("email")}
                placeholder="Enter your email"
                type="email"
                className="placeholder:text-[0.65rem] text-[0.65rem] lg:py-0.5"
              />
              <HelperText color="failure" className="mt-0">
                {errors.email && (
                  <span color="failure" className="text-[0.65rem]">
                    {errors.email?.message}
                  </span>
                )}
              </HelperText>
            </div>

            <button className="bg-[#3A5B22] w-full text-[#fff] py-1.5 text-[10px] font-bold rounded-md mt-4">
              Submit
            </button>
          </form>

          <div className="flex items-center text-sm font-medium justify-center gap-x-8 mt-2.5">
            <Link
              className="text-[#0F3DDE] hover:underline"
              href={"/agent/login"}
            >
              sign in agent
            </Link>
            <Link
              className="text-[#0F3DDE] hover:underline"
              href={"/tenant/login"}
            >
              sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

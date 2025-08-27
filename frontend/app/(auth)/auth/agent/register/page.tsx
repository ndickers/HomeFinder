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
import { registerSchema } from "../../../formSchema";
import Link from "next/link";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export default function page() {
  const [passVisibility, setPassVisibility] = useState("password");
  const [conPassVisibility, setConPassVisibility] = useState("password");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(registerSchema),
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
          <h1 className="font-medium text-xl mt-4 mb-4 lg:mt-0 lg:mb-2 text-center">
            Agent Sign up
          </h1>

          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <label htmlFor="name" className="text-[0.65rem] font-medium">
                Name
              </label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter your name"
                className="placeholder:text-[0.65rem] lg:py-0.5 text-[0.65rem]"
                type="text"
              />
              <HelperText color="failure" className="mt-0">
                {errors.name && (
                  <span color="failure" className="text-[0.65rem]">
                    {errors.name?.message}
                  </span>
                )}
              </HelperText>
            </div>
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
            <div className=" mb-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative w-full">
                {passVisibility === "password" ? (
                  <VisibilityOffIcon
                    fontSize="small"
                    onClick={() => {
                      setPassVisibility("text");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                ) : (
                  <VisibilityIcon
                    fontSize="small"
                    onClick={() => {
                      setPassVisibility("password");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                )}

                <Input
                  id="password"
                  {...register("password")}
                  type={passVisibility}
                  placeholder="Enter password"
                  className="placeholder:text-[0.65rem] text-[0.65rem] py-0.5"
                />
              </div>
              <HelperText color="failure" className="mt-0">
                {errors.password && (
                  <span color="failure" className="text-[0.65rem]">
                    {errors.password?.message}
                  </span>
                )}
              </HelperText>
            </div>
            <div className="mb-2">
              <label htmlFor="confirmPass" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative w-full ">
                {conPassVisibility === "password" ? (
                  <VisibilityOffIcon
                    fontSize="small"
                    onClick={() => {
                      setConPassVisibility("text");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                ) : (
                  <VisibilityIcon
                    fontSize="small"
                    onClick={() => {
                      setConPassVisibility("password");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                )}

                <Input
                  id="confirmPass"
                  {...register("confirmPassword")}
                  type={conPassVisibility}
                  placeholder="Confirm password"
                  className="placeholder:text-[10px] text-[10px] lg:py-0.5"
                />
              </div>
              <HelperText color="failure" className="mt-0">
                {errors.confirmPassword && (
                  <span color="failure" className="text-[0.65rem]">
                    {errors.confirmPassword?.message}
                  </span>
                )}
              </HelperText>
            </div>
            <button className="bg-[#3A5B22] w-full text-[#fff] py-1.5 lg:py-1 text-[10px] font-bold rounded-md mt-4">
              Sign up
            </button>
          </form>

          <div className="flex items-center mt-3">
            <div className="bg-[#F5F5F5] h-[2px] w-full border-none"></div>
            <p className="text-xs">OR</p>
            <div className="bg-[#F5F5F5] h-[2px] w-full border-none"></div>
          </div>
          <button
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google/agent`;
            }}
            className="flex items-center justify-center text-xs gap-1.5 border border-[#D9D9D9))]  mt-6 lg:mt-4 w-full rounded-md py-1.5 lg:py-1"
          >
            <Image
              src={"/assets/icons-google.svg"}
              width={25}
              height={25}
              alt="continue with google"
            />
            Continue with google
          </button>

          <div className="flex items-center gap-x-1.5 text-sm font-medium justify-center mt-2.5">
            <p>Have an account?</p>
            <Link
              className="text-[#0F3DDE] hover:underline"
              href={"/auth/agent/login"}
            >
              sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

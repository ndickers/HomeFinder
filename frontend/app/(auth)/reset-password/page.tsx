"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { HelperText, Spinner } from "flowbite-react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useForm, SubmitHandler } from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { poppins } from "@/components/ui/font";
import { passResetSchema } from "../formSchema";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  resendPassReset,
  setNewPassword,
} from "@/app/api/authentication/authApi";
import { toast } from "react-toastify";

type Inputs = {
  password: string;
  confirmPassword: string;
};
export default function page() {
  const [passVisibility, setPassVisibility] = useState("password");
  const [conPassVisibility, setConPassVisibility] = useState("password");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(passResetSchema),
  });
  const token = searchParams.get("token");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const newData = { password: data?.password, token: token as string };
    console.log(newData);
    try {
      const response = await setNewPassword(newData);
      if (response) {
        toast.success(response.message, { toastId: "resend-success" });
        setTimeout(() => {
          router.replace("/auth/tenant/login");
        }, 500);
      }
    } catch (error: any) {
      const err = JSON.parse(error.message);
      if (err.email) {
        setEmail(err.email);
        setMessage(err.message);
      } else {
        toast.error(err.message, { toastId: "error" });
        setTimeout(() => {
          router.replace("/auth/tenant/login");
        }, 500);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResendLoading(true);
    try {
      const response = await resendPassReset({ email });
      if (response) {
        toast.success(response.message, { toastId: "resend-success" });
      }
    } catch (error: any) {
      toast.error(error.message, { toastId: "error" });
    } finally {
      setResendLoading(false);
    }
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
          {message && (
            <p className="text-xs text-red-600 text-center mb-6">{message}</p>
          )}
          <Image
            className="w-[70px] md:w-[80px] mx-auto lg:w-[90px] h-auto"
            src={"/assets/homeFinderLogo.png"}
            alt="home finder logo"
            width={100}
            height={100}
          />
          <h1 className="font-medium text-xl mt-4 mb-4 lg:mt-0 lg:mb-2 text-center">
            Password Reset
          </h1>

          <form action="" onSubmit={handleSubmit(onSubmit)}>
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
            <button
              disabled={loading}
              className="bg-[#3A5B22] flex items-center justify-center w-full text-[#fff] py-1.5 text-[10px] font-bold rounded-md mt-4"
            >
              Reset
              {loading && <Spinner className="ml-1 mt-0" size="xs" />}
            </button>
          </form>

          <div className="flex items-center  text-sm font-medium justify-center gap-x-8 mt-2.5">
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
          <form
            onSubmit={handleResendLink}
            className="w-full flex justify-center items-center"
          >
            {email && (
              <button disabled={resendLoading} className="bg-blue-500 text-[#fff] px-4 py-2 rounded-md mx-auto my-4">
                Resend link
                {resendLoading && <Spinner className="ml-1 mt-0" size="xs" />}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

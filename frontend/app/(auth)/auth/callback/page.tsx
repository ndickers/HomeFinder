"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();
  const accessToken = searchParams.get("token");
  const user = searchParams.get("user");

  useEffect(() => {
    if (accessToken && user) {
      signIn("google custom", {
        accessToken,
        user,
        redirect: false,
      }).then((data) => {
        const user = session.data?.user;
        const role = user && "role" in user && (user.role as string);
        if (data?.error) {
          toast.error("Login failed!", { toastId: "login-error" });
          setTimeout(() => {
            router.replace("/auth/tenant/login");
          }, 500);
        }
        if (data) {
          toast.success("Login successful", { toastId: "login-success" });
          setTimeout(() => {
            if (role) {
              router.replace(`/${role.toLowerCase()}`);
            }
          }, 500);
        }
      });
    }
  }, [searchParams, router, session]);

  return <div>Logging you in...</div>;
}

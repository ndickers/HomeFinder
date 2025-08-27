"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accessToken = searchParams.get("token");
  const user = searchParams.get("user");

  //   useEffect(() => {
  //     const accessToken = searchParams.get("accessToken");
  //     const user = searchParams.get("user"); // base64 or JSON

  //     if (accessToken && user) {
  //       signIn("credentials", {
  //         accessToken,
  //         user,
  //         redirect: false,
  //       }).then(() => {
  //         router.push("/dashboard");
  //       });
  //     } else {
  //       router.push("/login");
  //     }
  //   }, [searchParams, router]);

  return (
    <div>
      Logging you in...
      <button
        onClick={() => {
          signIn("credentials", {
            accessToken,
            user,
            redirect: false,
          });
        }}
      >
        click
      </button>
    </div>
  );
}

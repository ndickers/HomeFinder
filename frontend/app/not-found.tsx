"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NotFound() {
  const { data } = useSession();
  const user = data?.user;
  const role = user && "role" in user && user?.role;
  const route = typeof role === "string" && role.toLowerCase();

  console.log({ role });
  return (
    <div className="flex px-4 flex-col items-center  justify-center w-full h-[100vh] ">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Sorry we couldn't find this page.{" "}
          </p>
          <p className="mb-8">
            But dont worry, you can find plenty of other things on our homepage.
          </p>

          <Link
            href={`/${route}`}
            className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
          >
            back to homepage
          </Link>
        </div>
        <div className="max-w-lg">
          <Image
            src={"/assets/not-found.png"}
            alt="not found"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}

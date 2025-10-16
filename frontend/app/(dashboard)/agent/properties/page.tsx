"use client";
import { createDraftProperty } from "@/app/api/properties/propertyApi";
import { Spinner } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;
  const accessToken = data?.accessToken as string;

  async function handleCreateProperty(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await createDraftProperty({
        accessToken,
        data: { userId: user?.id as string },
      });
      if (response.message === "Draft created") {
        router.replace(`/agent/properties/create/${response.id}`);
      } else {
        router.replace(`/agent/properties/edit/${response.id}`);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <form onSubmit={handleCreateProperty}>
        <button
          disabled={loading}
          className="bg-[#2563EB] py-1.5 px-2 text-sm  rounded-md text-[#fff]"
        >
          Add property {loading && <Spinner className=" mt-0" size="xs" />}
        </button>
      </form>
    </div>
  );
}

import { getUsers } from "@/app/api/users/userApi";
import { redirect } from "next/dist/server/api-utils";
import React from "react";

export default async function page() {
  try {
    const users = await getUsers();
    console.log({ users });
    return (
      <div>
        amin users
        <h1>New users</h1>
        <p>West coast</p>
      </div>
    );
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

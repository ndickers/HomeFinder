"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function page() {
  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        logout
      </button>
      Agent page
    </div>
  );
}

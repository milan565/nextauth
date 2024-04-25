"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";

export default function Menu() {
  const session = useSession();

  const handelLogOut = () => {
    signOut();
  };
  return (
    <>
      <section className="w-full h-[60px] bg-indigo-900 ">
        <div className="w-3/4 h-full mx-auto flex justify-between">
          <div className="h-full flex items-center">
            <Link
              href="/"
              className="text-lg font-semibold text-white px-4 py-2 mx-4 hover:text-slate-200"
            >
              Home
            </Link>
            <Link
              href="/profile"
              className="text-lg font-semibold text-white px-4 py-2 mx-4 hover:text-slate-200"
            >
              Profile
            </Link>
            <Link
              href="/blog"
              className="text-lg font-semibold text-white px-4 py-2 mx-4 hover:text-slate-200"
            >
              Blog
            </Link>
          </div>
          <div className="h-full flex items-center">
            {session?.status === "authenticated" ? (
              <button
                onClick={handelLogOut}
                className="px-4 py-2 rounded-md bg-white text-indigo-900 text-md font-semibold hover:bg-slate-100"
              >
                Log Out
              </button>
            ) : (
              <Link
                href="/signin"
                className="px-4 py-2 rounded-md bg-white text-indigo-900 text-md font-semibold hover:bg-slate-100"
              >
                SignIn
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export default async function Home() {
  const sesseion = await getServerSession(authOptions);
  // console.log("signin data on home page", sesseion);
  // console.log("inside page");

  return (
    <>
      <section className="w-full h-screen">
        <div className="w-3/4 mx-auto py-[20px]">
          <h1 className="text-lg font-bold text-indigo-900">Home page</h1>
        </div>
      </section>
    </>
  );
}

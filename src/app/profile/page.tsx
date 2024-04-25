import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

async function userInfo() {
  "use server";
  try {
    // console.log("inside DB query");

    const result = await prisma.users.findMany();
    return result;
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
}
export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin");
  }
  const users = await userInfo();
  // console.log(session);

  return (
    <>
      <section className="w-full h-screen">
        <div className="w-3/4 mx-auto py-[20px]">
          <h1 className="text-lg font-bold text-indigo-900">Profile page</h1>

          <div className="w-[500px] mx-auto my-[30px]">
            <h1>Register user info</h1>
            {users &&
              users.map((user) => {
                return (
                  <>
                    <div className="my-4 border-b py-2">
                      <h3 className="text-lg font-bold text-indigo-950">
                        {user.userName}
                      </h3>
                      <p>{user.role}</p>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}

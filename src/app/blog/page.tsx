import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import Blogcom from "@/components/common/blogcom";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

async function getBlogs() {
  "use server";
  try {
    const result = await prisma.blogs.findMany();
    return result;
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
}

const Blog = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/signin");
  }
  const blogs = await getBlogs();
  console.log(blogs);

  return (
    <>
      <section className="w-full h-screen">
        <div className="w-3/4 mx-auto py-[20px]">
          <h1 className="text-lg font-bold text-indigo-900">Blog page</h1>
          <Blogcom />
          <div className="w-full  border-t-2 border-indigo-700">
            <h1 className="text-xl font-bold text-indigo-900">All Posts</h1>
            {blogs &&
              blogs?.map((post, index) => {
                return (
                  <div
                    className="flex border-b border-slate-800 my-4 py-3"
                    key={index}
                  >
                    <h4 className="text-lg font-bold text-black mx-4">
                      <span className="mx-1 text-black font-bold">
                        {index + 1} .
                      </span>
                      {post.title} :
                    </h4>
                    <p className="text-md font-semibold ">{post.content}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

"use server";

import prisma from "@/lib/db";

export async function addBlogPost(title: string, content: string) {
  try {
    const result = await prisma.blogs.create({
      data: {
        title,
        content,
      },
    });
    return result;
  } catch (err) {
    return err;
  }
}

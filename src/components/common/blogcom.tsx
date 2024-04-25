"use client";
import React from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import prisma from "@/lib/db";
import { addBlogPost } from "@/app/blog/actions";

const FormSchema = z.object({
  title: z.string().min(5, { message: "title must be 5 character" }),

  content: z.string().min(10, { message: "conent must be 10 character" }),
});
export default function Blogcom() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await addBlogPost(data.title, data.content);

    if (result) {
      toast({ description: "Post successfully added" });
    } else {
      console.log("error");
    }
  }
  return (
    <>
      <div className=" border border-black rounded-md mx-auto w-[500px] my-4 py-4 px-3">
        <h1 className="text-xl text-center font-bold text-indigo-950">
          Add Blog Post
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="z-full space-y-6 py-[20px]"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="title..."
                      {...field}
                      className="bg-white font-semibold"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    content
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="content.."
                      {...field}
                      className="bg-white font-semibold h-[100px]"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Add
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

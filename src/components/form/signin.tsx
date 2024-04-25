"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),

  password: z.string().min(6, { message: "To short password" }),
});

export default function Signincon() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const isLogin = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    // console.log(isLogin);

    if (isLogin?.ok) {
      toast({
        description: "you have successfully login",
      });
      router.push("/");
    } else {
      toast({
        variant: "destructive",
        description: "credentials error",
      });
    }
  }

  const handelGoogle = () => {
    signIn("google");
  };
  return (
    <>
      <h1 className="text-2xl text-center font-bold text-slate-900">signin</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="z-full space-y-6 py-[20px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    className="bg-white font-semibold"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Signin
          </Button>
        </form>
      </Form>
      <div className="border-t border-slate-950 py-4">
        <Button
          className="w-full bg-indigo-900 hover:bg-indigo-700"
          onClick={handelGoogle}
        >
          Sign with Google
        </Button>
        <p className="my-3">
          If you don`t have Account{" "}
          <Link
            className="text-sm font-semibold text-blue-950  px-3"
            href="/signup"
          >
            SignUp
          </Link>{" "}
        </p>
      </div>
    </>
  );
}

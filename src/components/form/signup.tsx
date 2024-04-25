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
import { toast, useToast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  userName: z.string().min(3, { message: "UserName required" }),
  role: z.string().min(3, { message: "Role Required" }),
  email: z
    .string()
    .min(1, { message: "Email Required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "To short password" }),
});

export default function Signupcom() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      role: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post("/api/user", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response);

      if (response?.data) {
        toast({
          description: "successfully register",
        });
        router.push("/signin");
      }
    } catch (err) {
      console.log(err);

      toast({ variant: "destructive", description: "something went wrong" });
    }
  }
  return (
    <>
      <h1 className="text-2xl text-center font-bold text-slate-900">SignUp</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="z-full space-y-6 py-[20px]"
        >
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  UserName
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="UseName"
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Role</FormLabel>
                <FormControl>
                  <Input
                    placeholder="role"
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
                    placeholder="Password"
                    {...field}
                    className="bg-white font-semibold"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button type="submit">Signin</Button>
            <Link className="text-sm font-normal " href="/signin">
              Signin
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}

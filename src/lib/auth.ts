import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

type tUser = {
  email: string;
  name: string;
  role: string;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTHSECREATE,
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,

    async encode({ secret, token, maxAge }) {
      const encodedData = {
        name: token?.name,
        email: token?.email,
        role: token?.role,
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      };
      const jwtToken = jwt.sign(encodedData, "KSJJFKJSKFJKSJFKSJKS");
      return jwtToken;
    },
    async decode({ secret, token }) {
      const decodedToken = jwt.verify(token, "KSJJFKJSKFJKSJFKSJKS");

      return decodedToken;
    },
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // console.log("credentials", credentials);

        if (!email || !password) {
          return null;
        }
        const isExistingUser = await prisma.users.findUnique({
          where: {
            email: email,
          },
        });
        // console.log(isExistingUser);

        if (!isExistingUser) {
          return null;
        }
        const isValidePassword = await compare(
          password,
          isExistingUser?.password
        );
        // console.log(isValidePassword);

        if (!isValidePassword) {
          return null;
        }
        // console.log(isExistingUser);

        return {
          name: isExistingUser.userName,
          email: isExistingUser.email,
          role: isExistingUser.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // console.log(" session ", session);
      // console.log("token session ", token);
      // console.log("user session ", user);
      const encodedToken = jwt.sign(token, "KSJJFKJSKFJKSJFKSJKS");
      // console.log("encoded token", encodedToken);

      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      session.accessToken = encodedToken;
      return { ...session };
    },
    async jwt({ token, user, account }) {
      // console.log("token jwt ", token);
      // console.log("user jwt ", user);
      // console.log("account jwt ", account);
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};

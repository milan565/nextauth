import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function GET() {
  return NextResponse.json("successfully");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userName, email, password, role } = body;

    // checking is user exist with same email
    const isExistEmail = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (isExistEmail) {
      return NextResponse.json(
        { data: null, error: true, message: "already exist Emai id" },
        { status: 409 }
      );
    }

    // hasing password
    const hashPassword = await hash(password, 12);

    // inserting userdata in db
    const result = await prisma.users.create({
      data: {
        userName,
        email,
        role,
        password: hashPassword,
      },
    });
    if (!result) {
      return NextResponse.json(
        { error: "somehting went wrong" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { data: result, message: "successfull" },
      { status: 200 }
    );
  } catch (err) {}
}

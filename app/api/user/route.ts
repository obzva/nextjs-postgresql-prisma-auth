import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/initialize";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import * as zod from "zod";

const HASH_SALT = 10;

const userSchema = zod.object({
  username: zod.string().min(1, "Username is required").max(100),
  email: zod.string().min(1, "Email is required").email("Invalid email"),
  password: zod
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be longer than 8 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const isBodyValid = checkBodyType(body);
    if (!isBodyValid) {
      return NextResponse.json(
        {
          message: "Invalid request body",
        },
        { status: 400 },
      );
    }

    const { email, username, password } = userSchema.parse(body);

    const doesEmailAlreadyExist = await checkExist({ email });
    if (doesEmailAlreadyExist) {
      return NextResponse.json(
        {
          message: "User with this email already exists.",
        },
        { status: 409 },
      );
    }

    const doesUsernameAlreadyExist = await checkExist({ username });
    if (doesUsernameAlreadyExist) {
      return NextResponse.json(
        {
          message: "User with this username already exists.",
        },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, HASH_SALT);
    const newUser = await prisma.user.create({
      data: { email, username, password: hashedPassword },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 },
    );
  }
}

function checkBodyType(body: any): boolean {
  if (!body || typeof body !== "object") {
    return false;
  }
  const { email, username, password } = body;
  return (
    typeof email === "string" &&
    typeof username === "string" &&
    typeof password === "string"
  );
}

async function checkExist(keyValueObj: Prisma.UserWhereUniqueInput) {
  return await prisma.user.findUnique({
    where: keyValueObj,
  });
}

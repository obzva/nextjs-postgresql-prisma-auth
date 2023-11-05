"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type Props = {
  user?: Session["user"];
};

export default function User(props: Props) {
  async function handleButtonClick() {
    await signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  }

  return props?.user ? (
    <button onClick={handleButtonClick}>Sign Out</button>
  ) : (
    <Link href={"/sign-in"}>Sign in</Link>
  );
}

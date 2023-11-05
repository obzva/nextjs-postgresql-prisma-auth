"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod";
import { signinSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Signin() {
  const { push } = useRouter();
  const { handleSubmit, control } = useForm<zod.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleFormSubmit(values: zod.infer<typeof signinSchema>) {
    const data = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (data?.error) {
      window.alert("Sign-In Failed!");
      console.error(data.error);
      return;
    }
    push("/user");
  }

  return (
    <form
      className="flex flex-col space-y-8 p-8 rounded-md bg-gray-200"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col space-y-4">
        <Controller
          control={control}
          name={"email"}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              labelText="Email"
              placeholder="flynn@example.com"
              error={error}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name={"password"}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              labelText="Password"
              placeholder="Enter your password"
              type={"password"}
              error={error}
              helperText={"minimum length: 8 characters"}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      <Button buttonType={"submit"} buttonText="Sign In" />
      <div className={"w-full border-b-slate-400 border-b-2"}></div>
      <div className={"flex justify-between items-center px-4"}>
        <p className={"text-sm text-gray-500"}>{"Don't have an account?"}</p>
        <Link href={"/sign-up"} className={"text-slate-800 font-bold"}>
          Sign Up
        </Link>
      </div>
    </form>
  );
}

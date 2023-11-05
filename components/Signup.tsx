"use client";

import Button from "./Button";
import TextInput from "./TextInput";
import React from "react";
import * as zod from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/form-schema";
import { signup } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Signup() {
  const { push } = useRouter();

  const { handleSubmit, control } = useForm<zod.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      reEnterPassword: "",
    },
  });

  async function handleFormSubmit(values: zod.infer<typeof signupSchema>) {
    const { status } = await signup({
      username: values.username,
      email: values.email,
      password: values.password,
    });

    if (status === 201) {
      await push("/");
    } else {
      window.alert("Registration failed!");
    }
  }

  return (
    <form
      className="flex flex-col space-y-8 p-8 rounded-md bg-gray-200"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col space-y-4">
        <Controller
          control={control}
          name={"username"}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              labelText="Username"
              placeholder="Flynn"
              helperText={"maximum length: 100 characters"}
              error={error}
              value={value}
              onChange={onChange}
            />
          )}
        />
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

        <Controller
          control={control}
          name={"reEnterPassword"}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              labelText="Re-Enter Password"
              placeholder="Re-enter your password"
              type={"password"}
              error={error}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      <Button buttonType={"submit"} buttonText="Sign Up" />
    </form>
  );
}

"use client";

import Button from "../Button";
import TextInput from "../TextInput";
import React from "react";
import * as zod from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { signupSchema } from "@/lib/form-schema";
import { signup } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Signup() {
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<zod.infer<typeof signupSchema>>({
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
      await push("/sign-in");
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
          render={({ field: { onChange, value } }) => (
            <TextInput
              labelText="Username"
              placeholder="Flynn"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name={"username"}
          render={({ message }) => (
            <p className={"text-red-500 text-sm"}>{`*${message}`}</p>
          )}
        />
        <Controller
          control={control}
          name={"email"}
          render={({ field: { onChange, value } }) => (
            <TextInput
              labelText="Email"
              placeholder="flynn@example.com"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name={"email"}
          render={({ message }) => (
            <p className={"text-red-500 text-sm"}>{`*${message}`}</p>
          )}
        />
        <Controller
          control={control}
          name={"password"}
          render={({ field: { onChange, value } }) => (
            <TextInput
              labelText="Password"
              placeholder="Enter your password"
              type={"password"}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name={"password"}
          render={({ message }) => (
            <p className={"text-red-500 text-sm"}>{`*${message}`}</p>
          )}
        />
        <Controller
          control={control}
          name={"reEnterPassword"}
          render={({ field: { onChange, value } }) => (
            <TextInput
              labelText="Re-Enter Password"
              placeholder="Re-enter your password"
              type={"password"}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name={"reEnterPassword"}
          render={({ message }) => (
            <p className={"text-red-500 text-sm"}>{`*${message}`}</p>
          )}
        />
        <Button buttonType={"submit"} buttonText="Sign Up" />
      </div>
    </form>
  );
}

import * as zod from "zod";

export const signupSchema = zod
  .object({
    username: zod.string().min(1, "Username is required").max(100),
    email: zod.string().min(1, "Email is required").email("Invalid email"),
    password: zod
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    reEnterPassword: zod.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.reEnterPassword, {
    path: ["reEnterPassword"],
    message: "Password do not match",
  });

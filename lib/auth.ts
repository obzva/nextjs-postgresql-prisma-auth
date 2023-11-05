import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/initialize";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "flynn@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        } else {
          const existingUser = await checkEmailExist(credentials.email);
          if (!existingUser) {
            return null;
          }

          const doesPasswordMatch = await checkPassword(
            credentials.password,
            existingUser.password,
          );
          if (!doesPasswordMatch) {
            return null;
          }

          return {
            id: String(existingUser.id),
            username: existingUser.username,
            email: existingUser.email,
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, username: user.username };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      };
    },
  },
};

async function checkEmailExist(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function checkPassword(passwordA: string, passwordB: string) {
  return await compare(passwordA, passwordB);
}

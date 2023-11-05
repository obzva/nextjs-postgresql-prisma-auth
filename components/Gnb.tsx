import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/components/User";

export default async function Gnb() {
  const session = await getServerSession(authOptions);

  return (
    <div className={"bg-slate-500 fixed w-full z-10 top-0 px-8"}>
      <div className={"flex justify-between items-center"}>
        <Link href={"/"}>Home</Link>
        <User user={session?.user} />
      </div>
    </div>
  );
}

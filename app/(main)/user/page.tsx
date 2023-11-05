import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function UserPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <h1>Loading...</h1>;
  }
  return <h1>{`Welcome ${session.user.username}!`}</h1>;
}

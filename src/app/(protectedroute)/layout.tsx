import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Protecter({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log("session = " + session);
  if (session) return children;
  else {
    redirect("/");
  }
}

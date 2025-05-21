import Logout from "@/components/Button/logout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashbord() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }
  return (
    <>
      <div className="flex flex-row-reverse">
        <div className="bg-yellow-300">eu, {session?.user?.name} </div>
        <div className="bg-amber-800">vou</div>
        <div className="bg-blue-950">dormir</div>
      </div>
              <Logout />

    </>
  );
}

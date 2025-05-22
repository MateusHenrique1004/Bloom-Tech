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
    <Logout />
      <div className=" flex flex-col m-20 bg-black">
        <div className=" flex flex-row">

            <div className="">

            </div>

            <div className="flex flex-col">
              
            </div>


         </div>         
   
      </div>
             

    </>
  );
}

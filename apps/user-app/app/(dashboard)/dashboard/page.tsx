import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { AddMoney } from "../../../components/Buttons";
import prisma from "@repo/db/client";

async function getBalance (){
    const  session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
     throw new Error("Authentication failed.")
     };
     const balance = await prisma.balance.findFirst({
         where:{
           userId: Number(session.user.id),
         }
     });
     return {
        amount: balance?.amount || 0,
        locked: balance?.amount || 0
     }
}
export default async function () {

    const  session = await getServerSession(authOptions);
    const balance = await getBalance();
    const timestamp = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      console.log(timestamp);

   
  return (
    <div className="w-full">
      <div className=" flex justify-between mt-14  px-0 sm:px-10 flex-wrap">
        <div className="flex flex-col sm:w-[550px]">
          <h1 className="font-[Tahoma] text-gray-800 font-bold text-[3rem]">
            Welcome back, {session.user.name}
          </h1>
          <p className="text-gray-600 text-lg mt-2">
          Manage your finances effortlessly—send money, pay bills, recharge, and more with the secure and seamless EasyPay app.          </p>
        </div>
        <div className="flex flex-start items-center h-[10rem] mr-10">
          <Image src="/logo.png" alt="logo" height={400} width={400} />
        </div>
      </div>
      <div className="py-10 px-2 sm:px-10 ">
            <div className="rounded-lg shadow-lg  bg-blue-900 py-5 px-5 flex justify-between ">
                <div>
                    <div className="text-lg sm:text-xl font-semibold text-gray-300">
                        Wallet Balance
                    </div>
                    <div className="text-2xl sm:text-3xl flex gap-1 text-gray-200 items-center font-bold pt-3">
                        <div className="font-light">
                        &#8377;
                        </div>
                    {balance.amount / 100}
                    </div>
                    <div className="pt-1 text-sm text-gray-400 sm:text-md font-normal">
                        Updated: {timestamp}
                    </div>
                </div>
                <div className=" flex justify-center items-center">        
                    <AddMoney/>
                </div>
                
            </div>
            
      </div>
    </div>
  );
}

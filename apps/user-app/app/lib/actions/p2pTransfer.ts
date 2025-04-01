"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    try {
        const session = await getServerSession(authOptions);
        console.log(session)
        const from = session?.user?.id;
        if (!from) {
            throw new Error("Authentication failed");
        }
    
        const toUser = await prisma.user.findFirst({
            where: {
                number: to
            }
        });
    
        if (!toUser) {
            throw new Error("No user found for this number.");
        };
        console.log("from number:", session.user.email);
        console.log("to number: ", toUser.number);
        if(toUser.number == session.user.email){
            throw new Error("sender's and reciever's number can't be same");
        };
        console.log("Checking :", toUser.number == session.user.email);
        await prisma.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
    
            const fromBalance = await tx.balance.findUnique({
                where: { userId: Number(from) },
              });
              if (!fromBalance || fromBalance.amount < amount) {
                throw new Error("Not enough balance in your account.");
              }
    
              await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } },
              });
    
              await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } },
              });
    
        });
        return { success: true, message: "Transfer successful" };

    }   catch (error:any) {

        console.log("Error in p2pTransfer.tsx: ", error);
        return { success: false, message: error.message };

    }
    
    } 
 
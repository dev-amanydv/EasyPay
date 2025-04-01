"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import axios, { AxiosError } from "axios";

export async function createOnRampTransaction(provider: string, amount: number) {
    try {
         // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        throw new Error("Authentication failed.")
    }
    if (amount == 0){
        throw new Error("Enter an amount")
    }
    const token = (Math.random() * 1000).toString();
    
    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    });
    try {
        const response = await axios.post('http://localhost:3004/hdfcWebhook', {
            token: token,
            user_identifier: session.user.id,
            amount: amount * 100
        });

    } catch (error) {
        const axiosError = error as AxiosError;
       throw new Error("Bank server is down")
    }

    return { success: true, message: "Money added successfully" };

        
    } catch (error:any) {
        return { success: false, message: error.message };
    }
   
}

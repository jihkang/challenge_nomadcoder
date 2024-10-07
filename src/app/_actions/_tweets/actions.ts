"use server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function getTweetId(id: number) {
    try {   
        const tweet = await db.tweet.findUnique({where: {
            id: id,
        }});
        
        return tweet;
    } catch(ex) {

        return redirect("/");
    }
}
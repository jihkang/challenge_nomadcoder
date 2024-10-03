"use server";

import { getSession, getTweetDB,  sessionOut } from "@/lib/db";

import { redirect } from "next/navigation";

interface TweetProps {
    title: string;
    content?: string;
    id: number;
}

export const logout = async () => {
    const session = await getSession();
    console.log(session);
    // await db.tweet.create({
    //     data: {
    //         title: "test",
    //         content: undefined,
    //         author : {
    //             connect: {
                    
    //             }
    //         },
    //     }
    // });
    await sessionOut();
    redirect("/")
}

export const getTweet = async () => {
    return await getTweetDB();
}
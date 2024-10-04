"use server";

import { getSession, getTweetDB,  sessionOut } from "@/lib/db";

import { redirect } from "next/navigation";

export const logout = async () => {
    const session = await getSession();
    await sessionOut();
    redirect("/")
}

export const getTweet = async () => {
    return await getTweetDB();
}
"use server";

import { sessionOut } from "@/lib/db";
import { redirect } from "next/navigation";

export const logout = async () => {
    await sessionOut();
    redirect("/")
}
import { db, getUserDB } from "@/lib/db";
import { redirect } from "next/navigation";

export async function getUser() {
    const session = await getUserDB();
    
    if (!session.result) {
        redirect("/");
    }

    return session.data;
}
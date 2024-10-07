import { getUserDB } from "@/lib/db";
import { redirect } from "next/navigation";

export async function getUser() {
    const session = await getUserDB();
    
    if (!session.result) {
        redirect("/create-account");
    }

    return session.data;
}
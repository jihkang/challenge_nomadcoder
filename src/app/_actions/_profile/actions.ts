import { getUserDB } from "@/lib/db";
import { redirect } from "next/navigation";

export async function getUser() {
    const {result, data} = await getUserDB();
    
    console.log(result, data);
    if (!result) {
        redirect("/");
    }
    return data;
}
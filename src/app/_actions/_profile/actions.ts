import { db, getUserDB } from "@/lib/db";
import { redirect } from "next/navigation";

export async function getUser() {
    const session = await getUserDB();
    
    if (!session.result) {
        redirect("/");
    }

    if (session?.data?.id) {
        await db.tweet.create({
            data: {
                title: "hello",
                content: "hello every one",
                author: {
                    connect: {
                        id: session.data.id,
                    }   
                }
            }
        })
    }
    return session.data;
}
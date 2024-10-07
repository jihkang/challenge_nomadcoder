"use server";

import { db, getSession, getTweetDB,  sessionOut } from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";

const z_validate = z.object({
    title: z.string().min(1).max(100),
    content: z.string().optional(),
});

export const logout = async () => {
    const session = await getSession();
    await sessionOut();
    redirect("/create-account");
}

export const getTweet = async () => {
    return await getTweetDB();
}

export const postTweet = async (prev: unknown, formData: FormData) => {
    const data = {
        title: formData.get("title"),
        content: formData.get("content")
    }

    const validate_data = z_validate.safeParse(data);
    if (!validate_data.success) {
        return {
            fieldErrors: validate_data.error.flatten().fieldErrors,
            formErrors: validate_data.error.flatten().formErrors,
        }
    }
    
    const id = await getSession();
    if (!id) {
        return {
            success: false,
            fieldErrors: [],
            formErrors: ["plz restart again"]
        }
    }

    await db.tweet.create({data: {
        title: validate_data.data.title,
        content: validate_data.data.content,
        author: {
            connect: {
                id: id,
            }
        }
    }});
    return {
        success: true
    }
}
import { PrismaClient } from "@prisma/client";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const db = new PrismaClient();

interface UserProps {
    username: string;
    email: string;
    password: string;
}

export async function createUser({...rest}: UserProps) {
    try {   
        const user = await db.user.create({
            data : {...rest}
        })

        const cookie: {
            id: number
            save: (props?: unknown) => Promise<unknown>;
        } = await getIronSession(cookies(), {
            cookieName: "cookies_challenge",
            password: process.env.STRONG_PASSWORD!
        });

        cookie.id = user.id;
        await cookie.save();
        
        return true;
    } catch {
        return false;
    }
}

import { PrismaClient, User } from "@prisma/client";
import { getIronSession } from "iron-session";
import bcrypt from "bcrypt";

import { cookies } from "next/headers";

export const db = new PrismaClient();

interface UserProps {
    username: string;
    email: string;
    password: string;
}

interface UserPrismaProps {
    id: number;
}

export async function createUser({...rest}: UserProps) {
    try { 
        const user = await db.user.create({
            data : {...rest}
        })
        sessionConnect(user.id);
        return true;
    } catch (e) {
        return false;
    }
}

export async function sessionConnect(id: number) {
    const session = await getIronSession<UserPrismaProps>(cookies(), {
        cookieName: "cookies_challenge",
        password: process.env.PASSWORD_STRONG!
    });

    session.id = id;
    await session.save();
    return session;
}

export async function sessionOut() {
    const session = await getIronSession<UserPrismaProps>(cookies(), {
        cookieName: "cookies_challenge",
        password: process.env.PASSWORD_STRONG!
    });
    await session.destroy();
}

export async function getSession() {
    const session = await getIronSession<UserPrismaProps>(cookies(), {
        cookieName: "cookies_challenge",
        password: process.env.PASSWORD_STRONG!
    })
    console.log(session);
    return session;
}

export async function getUserDB() {
    try {
        const cookie = await getIronSession<UserPrismaProps>(cookies(), {
            cookieName: "cookies_challenge",
            password: process.env.PASSWORD_STRONG!
        });
        
        console.log(cookie);

        const user = await db.user.findUnique({where: {
            id: cookie.id
        }, select : {
            username : true,
            email: true,
        }})
        
        return {
            result: true,
            data: user
        };
    } catch (e) {
        return {
            result: false,
            data: null
        };
    }
}

export async function getUserVerify({email, password}: {email: string, password: string}) {
    try {
        const user = await db.user.findUnique({where: {
            email: email,
        }, select: {
            password: true,
            id: true,
        }});
        if (!user) {
            return false;
        }
        const result = await bcrypt.compare(password, user?.password);

        if (result) {
            await sessionConnect(user.id);
            return true;
        }
    } catch (e) {
        console.log(e);
    }
    return false;
}

export async function getTweetDB() {
    return db.tweet.findMany({where: {
        content: {not: null}
    }});
}
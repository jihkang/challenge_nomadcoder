import { PrismaClient, User } from "@prisma/client";
import { getIronSession } from "iron-session";
import bcrypt from "bcrypt";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

    return session.id;
}

export async function getUserDB() {
    try {
        const id = await getSession();
        if (!id) {
            return redirect("/create-account");
        }
    
        const user = await db.user.findUnique({where: {
            id: id
        }, select : {
            id: true,
            username : true,
            email: true,
        }})
        
        return {
            result: true,
            data: user
        };
    } catch (e) {
        redirect("/create-account");
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
    const id = await getSession();

    if (id) {
        return db.tweet.findMany({
            where: {
            authorId: {
                not: id
            },
            content: {not: null}
        }, select: {
            id: true,
            content: true,
            title: true,
            author: {
              select: {
                username: true,
              }
            }
        }});
    }

    return db.tweet.findMany({
        where: {
            content: {not: null}
        },
        select: {
            id: true,
            content: true,
            title: true,
            author: {
              select: {
                username: true,
              }
            }
          }
    })
}
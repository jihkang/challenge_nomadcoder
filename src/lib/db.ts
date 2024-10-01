import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

interface UserProps {
    username: string;
    email: string;
    password: string;
}

export async function createUser({...rest}: UserProps) {
    await db.user.create({
        data : {...rest}
    })
}

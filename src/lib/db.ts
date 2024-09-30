import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

interface UserProps {
    username: string;
    email: string;
    password: string;
}

export async function createAccount({...rest}: UserProps) {
    await db.user.create({
        data : {...rest}
    })
}
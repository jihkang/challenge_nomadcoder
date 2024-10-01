"use server";

import {z} from "zod";
import { IronSession } from "iron-session";

interface validation_dto {
    username: string;
    password: string;
    email: string;
}

const checkEmail = (email: string) => {
    const regex = /^[^@]*@zod\.com$/;
    return regex.test(email);
}

const checkPassword = (password: string) => {
    const regex = /\d+/;
    return regex.test(password);    
}

const validation_object = z.object({
    username: z.string(),
    password: z.string(),
});

export async function LoginHandler(prevState: unknown,formData: FormData) {
    const data = {
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
    }
    const valid_data = validation_object.safeParse(data);


    return {
        result: valid_data.success,
        errors: valid_data.error?.flatten().fieldErrors,
    };
}
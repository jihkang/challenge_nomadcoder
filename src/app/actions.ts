"use server";

import {z} from "zod";

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
    email: z.string().refine(checkEmail, {message: "Only @zod.com emails are allowed"}),
    username: z.string().min(5, {message: "username should be at least 5 characters long"}),
    password: z.string().min(10, {message: "password should be at least 10 characters long"}).refine(checkPassword, {message: "at least one number (0123456789)"}),
});



export async function LoginHandler(prevState: any,formData: FormData) {
    const data = {
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
    }
    const valid_data = validation_object.safeParse(data);

    console.log({
        result: valid_data.success,
        errors: valid_data.error?.flatten().fieldErrors,
    })
    return {
        result: valid_data.success,
        errors: valid_data.error?.flatten().fieldErrors,
    };
}
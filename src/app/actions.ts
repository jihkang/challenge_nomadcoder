"use server";

import {z} from "zod";

interface validation_dto {
    username: string;
    password: string;
    email: string;
}

const checkPassword = (password: string) => {
    return password === "12345";
}

const validation_object = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string().refine(checkPassword),
});



export async function LoginHandler(prevState: any,formData: FormData) {
    const data = {
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
    }
    const valid_data = validation_object.safeParse(data);
    console.log(valid_data);
    console.log(
        {
            result: valid_data.success,
        errors: valid_data.error?.flatten().fieldErrors,})
    return {
        result: valid_data.success,
        errors: valid_data.error?.flatten().fieldErrors,
    };
}
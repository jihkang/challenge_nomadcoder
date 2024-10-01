"use server";

import {z} from "zod";

import { getUserVerify } from "@/lib/db";
import { redirect } from "next/navigation";

interface validation_dto {
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
    password: z.string().min(10, {message: "password should be at least 10 characters long"}).refine(checkPassword, {message: "at least one number (0123456789)"}),
}).refine(getUserVerify, {message: "cannot find user"});

export async function LoginHandler(prevState: unknown,formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    }

    const valid_data = await validation_object.safeParseAsync(data);
    if (!valid_data.success) {
        return {
            result: valid_data.success,
            field_errors: valid_data.error?.flatten().fieldErrors,
            form_errors: valid_data.error?.flatten().formErrors
        };
    }

    redirect("/");
}
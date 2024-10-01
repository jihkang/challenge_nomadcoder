"use server";

import { z } from "zod";
import bcrypt from "bcrypt"

import { createUser, db } from "@/lib/db";

const checkEmail = (email: string) => {
    const regex = /^[^@]*@zod\.com$/;
    return regex.test(email);
}

const checkEmailExists = async (email: string) => {
    const user = await db.user.findUnique({
        where: {email: email},
        select: {id: true}
    });

    return user ? false : true;
}

const checkPassword = (password: string) => {
    const regex = /\d+/;
    return regex.test(password);    
}

const validation_object = z.object({
    email: z.string().refine(checkEmail, {message: "Only @zod.com emails are allowed"}).refine(checkEmailExists, {message: "email exists"}),
    username: z.string().min(5, {message: "username should be at least 5 characters long"}),
    password: z.string().min(10, {message: "password should be at least 10 characters long"}).refine(checkPassword, {message: "at least one number (0123456789)"}),
});


export default async function createAccount(prevState:unknown, form: FormData) {
  const data = {
    username: form.get("username"),
    email: form.get("email"),
    password: form.get("password"),
  }

  const valid_data = await validation_object.safeParseAsync(data);
  if (!valid_data.success) {
    return {
      result: valid_data.success,
      errors: valid_data.error?.flatten().fieldErrors,
    }
  }

  const hashed_password = await bcrypt.hash(valid_data.data.password, 12);

  await createUser({
    ...valid_data.data,
    password: hashed_password,
  });
  
  return {
    result: valid_data.success,
    errors: valid_data.error?.flatten()?.fieldErrors,
  }
}
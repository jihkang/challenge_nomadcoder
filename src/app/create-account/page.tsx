"use client";

import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import createAccount  from "@/_actions/_register/actions";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function CreateAccount() {
    const [state, action, pending] = useFormState(createAccount, null);
   
    return (
        <Form action={action}>
            <Input name="email" type="email" errors={state?.errors?.email} placeholder="Email" />
            <Input name="username" type="text" errors={state?.errors?.username} placeholder="Username" />
            <Input name="password" type="password" errors={state?.errors?.password} placeholder="Password" />
            <Button pending={pending}>
                {pending ? "Loading..." : "Register"}
            </Button>
            <Link href="/login">
                login
            </Link>
            {state?.result && <button className="bg-teal-300 text-white">Success!</button>}
        </Form>
    );
}
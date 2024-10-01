"use client";

import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { LoginHandler } from "@/_actions/_login/actions";
import { useFormState } from "react-dom";

export default function Login() {
    const [state, action, pending] = useFormState(LoginHandler, null);
    
    return (
        <Form action={action}>
            <Input name="email" type="email" errors={state?.errors?.email} placeholder="Email" />
            <Input name="username" type="text" errors={state?.errors?.username} placeholder="Username" />
            <Input name="password" type="password" errors={state?.errors?.password} placeholder="Password" />
            <Button pending={pending}>
                {pending ? "Loading..." : "Login"}
            </Button>
            {state?.result && <button className="bg-teal-300 text-white">Success!</button>}
        </Form>
    );
}
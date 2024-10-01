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
            <Input name="email" type="email" errors={state?.field_errors?.email} placeholder="Email" />
            <Input name="password" type="password" errors={state?.field_errors?.password} placeholder="Password" />
            <Button pending={pending}>
                {pending ? "Loading..." : "Login"}
            </Button>
            {state?.form_errors?.map((form_error) => 
                <li key={form_error + "_error_key"}>
                    <span>{form_error}</span>
                </li>)
            }
            {state?.result && <button className="bg-teal-300 text-white">Success!</button>}
        </Form>
    );
}
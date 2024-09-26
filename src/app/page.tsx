"use client";

import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { LoginHandler } from "@/actions";
import { useFormState, useFormStatus } from "react-dom";


export default function Home() {
  /*
[ ] Input email 
[ ] Input name,
[ ] Input password  

[ ] input validation
[ ] button 
  */
  const [state, action, pending] = useFormState(LoginHandler, null);

  console.log(state);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <Form action={action}>
        <Input name="email" type="email" errors={state?.errors?.email} placeholder="Email"/>
        <Input name="username" type="text" errors={state?.errors?.username} placeholder="Username"/>
        <Input name="password" type="password" errors={state?.errors?.password} placeholder="Password"/>
        <Button pending={pending}>
          {pending ? "Loading..." : "Login"}
        </Button>
        {state?.result && <button className="bg-teal-300 text-white">Success!</button>
        }
      </Form>
    </main>
  );
}

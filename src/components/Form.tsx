"use client";

export default function Form({ children, action, ...rest }:
{
    children? : React.ReactNode, action: string | ((formData: FormData) => void | Promise<void>) | undefined
}) {
    return <form className="flex flex-col w-2/5 h-screen items-center justify-center p-0 m-0 outline-none" {...rest} action={action}>
       {children}
    </form>
}
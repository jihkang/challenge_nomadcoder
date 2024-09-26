"use client";


export default function Button({children, pending}: {
    pending: boolean;
    children: React.ReactNode
}) {
    

    return <button disabled={pending}>{children}</button>
}
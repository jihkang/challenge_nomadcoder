"use client";

// remove any for major
export default function Form({ children, action }: {children? : React.ReactNode, action: any}) {
    return <form className="flex flex-col w-2/5 h-3/5 items-center justify-center" action={action}>
       {children}
    </form>
}
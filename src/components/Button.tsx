"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    pending :boolean;
}

export default function Button({children, pending, onClick, ...rest}: ButtonProps) {
    return <button disabled={pending} onClick={onClick} {...rest}>{children}</button>
}
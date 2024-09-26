"use client";

import { ReactHTMLElement } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    name?: string;
    errors?: string[];
} 

export default function Input({name, errors, ...rest}: InputProps) {
    return <>
        <input name={name} {...rest}/>
        {
            errors?.map((error) => <span key={error+name}>
                {error}
            </span>)
        }
    </>
}
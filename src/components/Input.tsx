"use client";

import { ReactHTMLElement, useEffect, useRef, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    name?: string;
    errors?: string[];
    success?: boolean;
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
"use client";

import Button from "@/components/Button";
import { logout } from "./_actions/action";

export default function LogOut() {
    return <Button onClick={async() => {
        await logout()
    }} pending={false}>
        logout
    </Button>
}
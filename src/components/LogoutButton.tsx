'use client'

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogoutButton () {
    const handleLogOut = async () => {

        await signOut({callbackUrl : "/login"});
    }
    return (
        <Button onClick={() => handleLogOut()}>Logout</Button>
    )
}
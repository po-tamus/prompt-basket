"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ReactNode } from "react";

interface ProviderProps {
    children: ReactNode;
    session: Session | null;
}

const Provider = ({
    children, 
    session
}: ProviderProps ) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default Provider;
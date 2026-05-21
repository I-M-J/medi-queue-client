import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

const getBaseURL = () => {
    if (process.env.NEXT_PUBLIC_APP_URL) {
        return process.env.NEXT_PUBLIC_APP_URL;
    }
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }
    if (typeof window !== "undefined") {
        return window.location.origin;
    }
    return "http://localhost:3000";
};

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
    plugins: [
        jwtClient()
    ]
});

export const { useSession, signIn, signUp, signOut } = authClient;

"use client";

import { authClient } from "@/utils/auth-client";

export default function SignIn() {
    const handleGoogleAuth = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: "http://localhost:3000/diary",
        });
    };

    return (
        <div className="mt-12 py-24 bg-black/10 rounded-xl">
            <h2 className="text-center text-black">
                You are not authenticated
            </h2>
            <button
                onClick={handleGoogleAuth}
                className="block mt-4 mx-auto bg-black rounded-sm text-white px-4 py-1 cursor-pointer hover:bg-black/80"
            >
                Sign In
            </button>
        </div>
    );
}

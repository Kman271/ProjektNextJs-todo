import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {signOut} from "@/libs/auth/helpers";

export default function useSessionValidation() {
    const { data: session } = useSession();

    useEffect(() => {
        // Check if the session exists
        if (session) {
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            const tokenExpiration = parseInt(session.expires); // 30 minutes expiration from token issuance

            // If the session token has expired, sign out the user

            console.log("token expiration:", tokenExpiration, "time now:", currentTime);

            if (currentTime > tokenExpiration) {
                alert('Session expired. You will be logged out.');
                signOut().then();
            }
        }
    }, [session]);
}

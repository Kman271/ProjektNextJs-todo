'use server'
import {signIn as nextAuthSignIn, signOut as nextAuthSignOut} from '@/auth/index';
import {AuthError} from "next-auth";

export async function signIn(username: string, formData: FormData) {

    try {
        const callbackUrl = `/userPanel/${username}`;
        const credentials: Record<string, any> = {};
        formData.forEach((v, k) => (credentials[k] = v));

        console.log("FormData data is:", {...credentials, redirectTo: callbackUrl, redirect: false})
        const result = await nextAuthSignIn('credentials', {
            redirect: false,
            redirectTo: callbackUrl,
            ...credentials
        });

        console.log("Credientials:", credentials);
        console.log("Data sent to auth:", {redirect: false, redirectTo: callbackUrl, ...credentials})
        console.log("SignIn result:", result);

        console.log('result url:', result.url, "error:", result.error)

        if (result !== true) {
            console.error("SignIn failed");
            return result;
        }

        if (result.url) {
            const redirectTo = result.url || callbackUrl;
            console.log("result.url:", result.url, "callbackUrl:", callbackUrl);
            return redirectTo;
        }

        // if (!result.ok) {
        //     console.log("SignIn is not OK:");
        //     throw new Error("SignIn did not return OK");
        // }

    } catch (error: any) {
        throw new Error(error.message || "Unknown result during singIn");
    }

}

export async function signOut() {
    await nextAuthSignOut({
        redirectTo: '/'
    });
}

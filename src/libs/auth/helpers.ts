'use server'
import {signIn as nextAuthSignIn, signOut as nextAuthSignOut} from '@/auth/index';

export async function signIn(username: string, formData: FormData, pathname: string) {

    try {
        const callbackUrl = `/userPanel/${username}`;
        const credentials: Record<string, any> = {};
        formData.forEach((v, k) => (credentials[k] = v));

        console.log("FormData data is:", {...credentials, redirectTo: callbackUrl, redirect: false})
        // console.log("Credientials:", credentials);

        const result: string = await nextAuthSignIn('credentials', {
            redirect: false,
            redirectTo: callbackUrl,
            ...credentials
        });
        const stringEnd =  result.substring(result.lastIndexOf('/', result.lastIndexOf('/')-1))
        console.log("SignIn result:", result, "callback:", callbackUrl, "result splited:", stringEnd, "are equal?", callbackUrl === stringEnd);

        if( callbackUrl !== stringEnd ) {
            console.error("SignIn failed");
            return {ok: false, url: result};
        }

            console.log("SignIn succeeded")
            return {ok: true, url: result};

    } catch (error: any) {
        throw new Error(error.message || "Unknown result during singIn");
    }

}

export async function signOut() {
    await nextAuthSignOut({
        redirectTo: '/'
    });
}

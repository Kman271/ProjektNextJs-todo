'use server'
import {signIn as naSignIn, signOut as naSignOut} from '@/auth/index';

export async function signIn() {
    await naSignIn('credentials', {
        redirectTo: `/userPanel`,
    });

}
export async function signOut() {
    await naSignOut({
        redirectTo: '/'
    });
}

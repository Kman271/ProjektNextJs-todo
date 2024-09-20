import NextAuth, {User, NextAuthConfig} from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import {dbGetUsers} from "@/libs/data/data";
import {userType} from "@/libs/types/dataTypes";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "Tomek"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials): Promise<User | null> {
                const users: userType[] = await dbGetUsers();
                const user: userType | undefined = users.find( (u: userType) =>
                    u.username === credentials.username &&
                    u.password === credentials.password
                );
                return user ? {id: user.user_id.toString(), name: user.username} : null;
            }

        })
    ],
    basePath: BASE_PATH,
    secret: process.env.NEXTAUTH_SECRET,
};

export const {handlers, auth, signIn, signOut} = NextAuth(authOptions)
import NextAuth, {NextAuthConfig, User} from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import {dbGetUsers} from "@/libs/data/data";
import {userType} from "@/libs/types/dataTypes";
import {JWT} from "@auth/core/jwt";
import {Session} from "next-auth";
import { PrismaClient } from "@prisma/client"
import {compareHashedPassword} from "@/libs/data/utils";

const TOKEN_TIME_LIMIT = 30*60; //30 minutes
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export const BASE_PATH = '/api/auth';
//const isProduction = process.env.NODE_ENV === "production";

export const authOptions: NextAuthConfig =  {
    // debug: process.env.NODE_ENV === 'development',
    session: {
      strategy: 'jwt',
        maxAge: TOKEN_TIME_LIMIT,
        //updateAge: TOKEN_TIME_LIMIT

    },
    providers: [
        Credentials({
            credentials: {
                username: {label: 'username', type: "text"},
                password: {label: 'password', type: 'password'},
            },

            authorize: async (credentials) => {
                try {
                    const {username, password} = credentials;

                    const users: userType[] = await dbGetUsers();
                    // console.log("NextAuth Users:", users);
                    // console.log("NextAuth credentials got:", credentials);

                    const user = users.find((u: userType) =>
                        u.username.toString() == username?.toString() &&
                        compareHashedPassword(u.password.toString(), password?.toString() || "")
                    );

                    if(!user) {
                        // throw new Error("Credentials error")
                        return {error: "Invalid username or password"};
                    }


                    console.log("NextAuth user confirmed:", user);
                    return {
                        name: user.username,
                        id: user.user_id.toString(),
                    }

                } catch (error: any) {
                    console.error("Authorize error:", error.message);
                    return {error: 'OTHER ERROR DURING AUTH:' + error.message || "Login failed"};
                }
            }

        })
    ],

    callbacks: {
        async signIn({ user } : {user:any}) {
            console.log("SignIn callback - user is:", user)

            if (user.error) {
                const errorString = encodeURIComponent(user.error);
                console.log("with encoded url:", errorString)
                return `/auth/login?error=${errorString}`
            }

            if(!user) throw new Error("User is undefined in signIn callback");

            return true;
        },

            async jwt({ token, user } : {token: JWT, user?: User|null}) {

                if (user) {
                    token.iat = Math.floor(Date.now() / 1000)
                    token.id = user.id?.toString(); // Assign user details to the token

                    // console.log("JWT token:", token);
                }

                const currentTime = Math.floor(Date.now() / 1000)

                if(token.iat && currentTime - token.iat > TOKEN_TIME_LIMIT) {
                    return null;
                }

                return token;
            },

            async session({ session, token } : {session: Session, token: JWT}) {
                if(token.id) {
                    if (token.id) {
                        session.user = {
                            ...session.user,
                            id: token.id.toString()
                        }
                    }
                }
                return session;
            },

    },

    pages: {
        signIn: '/auth/login',
        signOut: '/',
        error: '/auth/login'
    },
    basePath: BASE_PATH,
    secret: process.env.NEXTAUTH_SECRET
};

export const {handlers, signIn, signOut, auth} = NextAuth(authOptions)
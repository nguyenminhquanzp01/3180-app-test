import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";

import { db } from "@/server/db";


/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"];
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const OAuthProviders = [
    Discord({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET
      }),
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
            }
        }
    })
]

export const    authConfig = {
    providers: OAuthProviders,
    //[

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    //],
    adapter: PrismaAdapter(db),
    callbacks: {
        session: ({ session, user }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        }),
        // authorized: async ({ auth }) => {
        //     // Logged in users are authenticated, otherwise redirect to login page
        //     return !!auth
        // }
        // authorized({ auth, request: { nextUrl } }) {
        //     const isLoggedIn = !!auth?.user;
        //     const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        //     if (isOnDashboard) {
        //       if (isLoggedIn) return true;
        //       return false; // Redirect unauthenticated users to login page
        //     } else if (isLoggedIn) {
        //       return Response.redirect(new URL('/dashboard', nextUrl));
        //     }
        //     return true;
        //   },
    },
    pages: {
        signIn: '/login',
    },
} satisfies NextAuthConfig;

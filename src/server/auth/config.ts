import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import Credentails from "next-auth/providers/credentials"
import { db } from "@/server/db";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validators";
import { verify } from "argon2";
import { TokensIcon } from "@radix-ui/react-icons";


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
export const Providers = [
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
    }),
    Credentials({
        credentials : {
            email: {},
            password: {},
        },
        authorize: async (credentials) =>  {
            console.log(`credential = ${credentials.email}'\n${credentials.password}`)
            const {email, password} = await loginSchema.parseAsync(credentials)
            const user = await db.user.findFirst({
                where: {
                    email: email
                },
            });
            if (!user) {
                console.log('user not exist')
                return null
            }
            const isPasswordValid = await verify(user.password as string, password);
            
            if (!isPasswordValid) {
                console.log('invalid password')
                return null;
            }
            else {
                console.log(user)
                return user
            }    
        }

    })
]

export const authConfig = {
    secret: process.env.AUTH_SECRET,
    providers: Providers,
    adapter: PrismaAdapter(db),
    callbacks: {
        jwt: ({token, account, user}) => {//account and user only available 1 time when user login
            // console.log("jwt call")
            // console.log(token)
            return token
        },
        session: ({ session, token }) => {
            // console.log("session call")
            // console.log(session)
            return {
                ...session,
                userid: token.sub
            }
            // user: {
            //     ...session.user,
                
            // },
        },
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
    session: {
        strategy: 'jwt'
    }
} satisfies NextAuthConfig;

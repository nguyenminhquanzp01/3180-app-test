// 'use client'
import { signIn } from "@/server/auth/index";
import { OAuthProviders } from "@/server/auth/config";
import { auth } from "@/server/auth/index";
import { redirect } from "next/navigation";
export default async function SignInPage({ searchParams }: { searchParams: Promise<{ callbackUrl: string }> }) {
    let s = await searchParams;
    let session = await auth();
    if (session) 
        redirect('/')
    console.log(session);
    OAuthProviders.map((p) => { console.log(p.id) })
    return (
        <div className="px-10 py-10 flex flex-col items-center">
            <form action={async (formData) => {
                'use server'
                try {
                    await signIn(formData.get('provider') as string, {
                        redirectTo: s.callbackUrl
                    })
                }
                catch (error) {
                    console.log("page.tsx :")
                    throw error
                }

            }}>
                {OAuthProviders.map((provider) => {
                    return (
                        <button className="px-5 py-2 bg-blue-400 rounded" key={provider.name as string} type='submit' name="provider" value={provider.id as string}>
                            <span>Sign in with {provider.name}</span>
                        </button>
                    )
                })}
            </form>
        </div>
    )
}
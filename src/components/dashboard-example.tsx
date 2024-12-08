'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function Dashboard() {
    let session = useSession()
    const router = useRouter();
    console.log(session)
    return (
        <div className="py-10 flex flex-col item-center">
            <button className="bg-green-200 my-2" type="submit" onClick={() => router.push('/')}>
                Navigate to '/'
            </button>
            <button className="bg-green-200 my-2" type="submit" onClick={() => router.push('/admin-example/server_user')}>
                Navigate to '/user'
            </button>
        </div>
    )
}
'use client'

import { api } from "@/trpc/react"

export function UserList() {
    const [users, query] = api.user.getAllUser.useSuspenseQuery()
    if (query.isFetching) {
        console.log('isFetching')
        return <div>Loading ...</div>
    }
    return (
        <ul>
            {users.map((user) => {
                console.log(user.name)
                return (
                    <li key={user.name as string}>
                        {user.name}
                    </li>
                )
            })}
        </ul>
    )
}
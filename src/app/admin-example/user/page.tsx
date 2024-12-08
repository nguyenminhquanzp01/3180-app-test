'use client'
import { api } from "@/trpc/react";
import { type User } from "@prisma/client";

export default function User() {
    const users = api.user.getAllUser.useQuery()
    console.log(users);
    return (
        <ul>
            {/* {users.map((user) => {
                return (
                    <li>
                        {user.name}
                    </li>
                )
            })} */}
        </ul>
    )
}
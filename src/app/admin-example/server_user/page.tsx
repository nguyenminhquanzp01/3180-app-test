import { UserList } from "@/components/user-example";
import { api, HydrateClient } from "@/trpc/server";

export default async function ServerUser() {
    // void api.user.getAllUser.prefetch()

    return (
        // <HydrateClient>
            <UserList />
        // </HydrateClient>
    )

}
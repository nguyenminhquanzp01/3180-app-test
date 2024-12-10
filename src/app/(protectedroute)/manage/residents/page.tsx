import { api } from "@/trpc/server";
import Residents from "./residents";

export default function ResidentServer() {
    void api.resident.getAll.prefetch()
    return (
        <Residents/>
    )
}
import { SessionProvider } from "next-auth/react"
import { Dashboard } from "../../components/dashboard-example"

export default function Administrator() {
    return (
        <SessionProvider>
            <Dashboard />
        </SessionProvider>
    )
}
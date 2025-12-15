import { auth as clerkAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function isRegistered() {
    const { sessionClaims, userId } = await clerkAuth()

    return { userId, status: sessionClaims?.publicMetadata?.status == 'registered', redirectToRegister: () => redirect("/auth/register"), sessionClaims }
}

export { isRegistered }
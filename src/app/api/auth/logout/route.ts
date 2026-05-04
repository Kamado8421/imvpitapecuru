import { cookies } from "next/headers";

export async function POST() {
    const c = await cookies();

    c.delete("auth_token")

    return Response.json({ success: true });
}
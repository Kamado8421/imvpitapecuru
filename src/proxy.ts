import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    const token = req.cookies.get("auth_token")?.value;
    const url = req.nextUrl.clone();

    // Se o usuário está logado e acessa /login, redireciona para /dashboard
    if (token && url.pathname === "/login") {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    // Se o usuário não está logado e tenta acessar /dashboard, redireciona para /login
    if (!token && url.pathname.startsWith("/dashboard")) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // Permite continuar normalmente para outras rotas
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};

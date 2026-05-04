import { NextRequest, NextResponse } from "next/server";
import { entrieService } from "../server/services/entrie.service";
import { requireAuth } from "../server/middlewares/auth.middleware";

// 📥 Criar entrada
export async function POST(req: NextRequest) {
    try {
        const user = await requireAuth();
        const body = await req.json();

        const entrie = await entrieService.create(body);

        if (!entrie) {
            return NextResponse.json(
                { error: "Erro ao criar entrada" },
                { status: 400 }
            );
        }

        return NextResponse.json(entrie, { status: 201 });

    } catch (error) {
        
        if (error instanceof Error) {

            if (error.message === "UNAUTHORIZED") {
                return NextResponse.json(
                    { success: false, message: "Não autenticado" },
                    { status: 401 }
                );
            }

        }
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}

// 📄 Listar entradas (com filtro opcional de mês)
export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth();
        const { searchParams } = new URL(req.url);
        const month = searchParams.get("month");

        const monthIndex = month ? Number(month) : undefined;

        const entries = await entrieService.getAll(monthIndex);

        return NextResponse.json(entries);

    } catch (error) {
        if (error instanceof Error) {

            if (error.message === "UNAUTHORIZED") {
                return NextResponse.json(
                    { success: false, message: "Não autenticado" },
                    { status: 401 }
                );
            }

        }
        return NextResponse.json(
            { error: "Erro ao buscar entradas" },
            { status: 500 }
        );
    }
}
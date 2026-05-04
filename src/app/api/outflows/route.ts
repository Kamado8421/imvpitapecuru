import { NextRequest, NextResponse } from "next/server";
import { outflowsService } from "../server/services/outflows.service";
import { OutflowsType } from "../server/types/database-tables.type";
import { requireAuth } from "../server/middlewares/auth.middleware";

// 📤 Criar saída
export async function POST(req: NextRequest) {
    try {
        const user = await requireAuth();
        const body: OutflowsType = await req.json();

        const outflow = await outflowsService.create(body);

        if (!outflow) {
            return NextResponse.json(
                { error: "Erro ao criar saída" },
                { status: 400 }
            );
        }

        return NextResponse.json(outflow, { status: 201 });

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

// 📄 Listar saídas (com filtro opcional de mês)
export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth();
        const { searchParams } = new URL(req.url);
        const month = searchParams.get("month");

        const monthIndex = month ? Number(month) : undefined;

        const outflows = await outflowsService.getAll(monthIndex);

        return NextResponse.json(outflows);

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
            { error: "Erro ao buscar saídas" },
            { status: 500 }
        );
    }
}
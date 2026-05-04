import { NextRequest, NextResponse } from "next/server";
import { outflowsService } from "../../server/services/outflows.service";
import { requireAuth } from "../../server/middlewares/auth.middleware";

// 🔍 Buscar por ID
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await requireAuth();
        const { id } = await params
        const outflow = await outflowsService.getById(id);

        if (!outflow) {
            return NextResponse.json(
                { error: "Saída não encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(outflow);

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
            { error: "Erro ao buscar saída" },
            { status: 500 }
        );
    }
}

// 🗑️ Deletar
export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await requireAuth();
        const { id } = await params
        const deleted = await outflowsService.delete(id);

        if (!deleted) {
            return NextResponse.json(
                { error: "Erro ao deletar saída" },
                { status: 400 }
            );
        }

        return NextResponse.json({
            message: "Saída deletada com sucesso"
        });

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
            { error: "Erro ao deletar saída" },
            { status: 500 }
        );
    }
}
import { NextRequest, NextResponse } from "next/server";
import { entrieService } from "../../server/services/entrie.service";

// 🔍 Buscar por ID
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const entrie = await entrieService.getById(id);

        if (!entrie) {
            return NextResponse.json(
                { error: "Entrada não encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(entrie);

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
            { error: "Erro ao buscar entrada" },
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
        const { id } = await params
        const deleted = await entrieService.delete(id);

        if (!deleted) {
            return NextResponse.json(
                { error: "Erro ao deletar entrada" },
                { status: 400 }
            );
        }

        return NextResponse.json({ message: "Entrada deletada com sucesso" });

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
            { error: "Erro ao deletar entrada" },
            { status: 500 }
        );
    }
}
import { NextRequest, NextResponse } from "next/server";
import { outflowsCategoryService } from "../../server/services/outflows-category.service";
import { requireAuth } from "../../server/middlewares/auth.middleware";

// 🔍 Buscar por ID
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await requireAuth();
        const id = Number((await params).id);

        const categories = await outflowsCategoryService.getAll();
        const category = categories.find(c => c.id === id);

        if (!category) {
            return NextResponse.json(
                { error: "Categoria não encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(category);

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
            { error: "Erro ao buscar categoria" },
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
        const id = Number((await params).id);

        const deleted = await outflowsCategoryService.delete(id);

        if (!deleted) {
            return NextResponse.json(
                { error: "Erro ao deletar categoria" },
                { status: 400 }
            );
        }

        return NextResponse.json({
            message: "Categoria deletada com sucesso"
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
            { error: "Erro ao deletar categoria" },
            { status: 500 }
        );
    }
}
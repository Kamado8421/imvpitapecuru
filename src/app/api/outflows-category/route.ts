import { NextRequest, NextResponse } from "next/server";
import { outflowsCategoryService } from "../server/services/outflows-category.service";
import { requireAuth } from "../server/middlewares/auth.middleware";

// 📥 Criar categoria
export async function POST(req: NextRequest) {
    try {
        const user = await requireAuth();
        const body = await req.json();

        const category = await outflowsCategoryService.create(body);

        if (!category) {
            return NextResponse.json(
                { error: "Erro ao criar categoria" },
                { status: 400 }
            );
        }

        return NextResponse.json(category, { status: 201 });

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

// 📄 Listar categorias
export async function GET() {
    try {
        const user = await requireAuth();

        const categories = await outflowsCategoryService.getAll();

        return NextResponse.json(categories);

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
            { error: "Erro ao buscar categorias" },
            { status: 500 }
        );
    }
}
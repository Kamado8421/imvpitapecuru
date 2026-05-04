import { NextRequest, NextResponse } from "next/server";
import { eventTypeService } from "../../server/services/event-type.service";
import { requireAuth } from "../../server/middlewares/auth.middleware";

// 🔍 Buscar por ID
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await requireAuth();

        const { id } = await params;
        const intId = Number(id);

        const eventTypes = await eventTypeService.getAll();
        const eventType = eventTypes.find(e => e.id === intId);

        if (!eventType) {
            return NextResponse.json(
                { error: "Tipo de evento não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(eventType);

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
            { error: "Erro ao buscar tipo de evento" },
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

        const { id } = await params;
        const intId = Number(id);

        const deleted = await eventTypeService.delete(intId);

        if (!deleted) {
            return NextResponse.json(
                { error: "Erro ao deletar tipo de evento" },
                { status: 400 }
            );
        }

        return NextResponse.json({
            message: "Tipo de evento deletado com sucesso"
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
            { error: "Erro ao deletar tipo de evento" },
            { status: 500 }
        );
    }
}
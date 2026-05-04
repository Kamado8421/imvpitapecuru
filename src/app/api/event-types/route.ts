import { NextRequest, NextResponse } from "next/server";
import { eventTypeService } from "../server/services/event-type.service";
import { requireAuth } from "../server/middlewares/auth.middleware";

// 📥 Criar tipo de evento
export async function POST(req: NextRequest) {
    try {
        const user = await requireAuth();
        const body = await req.json();

        const eventType = await eventTypeService.create(body);

        if (!eventType) {
            return NextResponse.json(
                { error: "Erro ao criar tipo de evento" },
                { status: 400 }
            );
        }

        return NextResponse.json(eventType, { status: 201 });

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

// 📄 Listar tipos de evento
export async function GET() {
    try {
        const user = await requireAuth();

        const eventTypes = await eventTypeService.getAll();

        return NextResponse.json(eventTypes);

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
            { error: "Erro ao buscar tipos de evento" },
            { status: 500 }
        );
    }
}
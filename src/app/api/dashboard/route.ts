import { NextResponse } from "next/server";
import { prisma } from "../server/lib/prisma";
import { requireAuth } from "../server/middlewares/auth.middleware";

export async function GET() {
    try {
        const user = await requireAuth();

        const now = new Date();

        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        // 📥 Total de entradas
        const entries = await prisma.entries.aggregate({
            _sum: {
                value: true
            },
            where: {
                eventDate: {
                    gte: start,
                    lte: end
                }
            }
        });

        // 📤 Total de saídas
        const outflows = await prisma.outflows.aggregate({
            _sum: {
                value: true
            },
            where: {
                dateOutflow: {
                    gte: start,
                    lte: end
                }
            }
        });

        const totalEntries = entries._sum.value ?? 0;
        const totalOutflows = outflows._sum.value ?? 0;

        const balance = totalEntries - totalOutflows;

        return NextResponse.json({
            totalEntries,
            totalOutflows,
            balance
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
            { error: "Erro ao gerar dashboard" },
            { status: 500 }
        );
    }
}
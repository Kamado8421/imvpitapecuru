import { prisma } from "../server/lib/prisma";

export async function POST() {
    try {
        const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        const [entriesGrouped, outflowsGrouped, categories] = await Promise.all([
            prisma.entries.groupBy({
                by: ['entrieType', 'entrieChannel'],
                where: { eventDate: { gte: start, lte: end } },
                _sum: { value: true },
            }),
            prisma.outflows.groupBy({
                by: ['categoryId'],
                where: { dateOutflow: { gte: start, lte: end } },
                _sum: { value: true },
            }),
            prisma.outflowsCategory.findMany(),
        ]);

        function getValue(type: string, channel: string) {
            return (
                entriesGrouped.find(
                    (e) => e.entrieType === type && e.entrieChannel === channel
                )?._sum.value || 0
            );
        }

        const entries = [
            { title: 'Dízimos Bancários', total: getValue('DIZIMO', 'PIX') },
            { title: 'Dízimos Espécie', total: getValue('DIZIMO', 'ESPECIE') },
            { title: 'Ofertas Gerais Bancária', total: getValue('GERAIS', 'PIX') },
            { title: 'Ofertas Gerais Espécie', total: getValue('GERAIS', 'ESPECIE') },
            { title: 'Ofertas Específicas Bancária', total: getValue('OFERTA', 'PIX') },
            { title: 'Ofertas Específicas Espécie', total: getValue('OFERTA', 'ESPECIE') },
        ];

        const outflows = categories.map((category) => {
            const found = outflowsGrouped.find(
                (o) => o.categoryId === category.id
            );

            return {
                description: category.name,
                total: found?._sum.value || 0,
            };
        });

        const totalEntries = entries.reduce((acc, e) => acc + e.total, 0);
        const totalOutflows = outflows.reduce((acc, o) => acc + o.total, 0);

        return Response.json({
            entries,
            outflows,
            totalEntries,
            totalOutflows,
            totalGeral: totalEntries - totalOutflows,
        });

    } catch (error) {
        return new Response("Erro interno do servidor", { status: 500 });
    }
}
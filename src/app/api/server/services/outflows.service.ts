import { prisma } from "../lib/prisma";
import { OutflowsType } from "../types/database-tables.type";
import { isSameMonthAndYear } from "../utils/date";

class OutflowsService {

    async create(data: OutflowsType) {
        try {
            const parsedDate = new Date(data.dateOutflow);

            if (!isSameMonthAndYear(parsedDate)) {
                throw new Error("A saída deve pertencer ao mês e ano atual.");
            }

            const outflow = await prisma.outflows.create({
                data: {
                    ...data,
                    dateOutflow: parsedDate
                }
            });

            return outflow;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAll(monthIndex?: number) {
        try {
            const now = new Date();

            const month = monthIndex ?? now.getMonth();
            const year = now.getFullYear();

            const start = new Date(year, month, 1);
            const end = new Date(year, month + 1, 0, 23, 59, 59);

            return await prisma.outflows.findMany({
                where: {
                    dateOutflow: {
                        gte: start,
                        lte: end
                    }
                },
                select: {
                    id: true,
                    description: true,
                    value: true,
                    dateOutflow: true,

                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                orderBy: {
                    dateOutflow: 'desc'
                }
            });

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getById(id: string) {
        try {
            return await prisma.outflows.findUnique({
                where: { id },
                include: {
                    category: true
                }
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async delete(id: string) {
        try {
            await prisma.outflows.delete({
                where: { id }
            });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export const outflowsService = new OutflowsService();
import { prisma } from "../lib/prisma";
import { EntriesType } from "../types/database-tables.type";
import { isSameMonthAndYear } from "../utils/date";

class EntrieService {

    async create(data: EntriesType) {
        try {
            const parsedDate = new Date(data.eventDate);

            if (!isSameMonthAndYear(parsedDate)) {
                throw new Error("A entrada deve pertencer ao mês e ano atual.");
            }

            const entrie = await prisma.entries.create({
                data: {
                    ...data,
                    eventDate: parsedDate
                }
            });

            return entrie;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getById(entrieId: string) {
        try {
            return await prisma.entries.findUnique({
                where: { id: entrieId }
            });
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

            return await prisma.entries.findMany({
            where: {
                eventDate: {
                    gte: start,
                    lte: end
                }
            },
            select: {
                id: true,
                eventDate: true,
                value: true,
                entrieType: true,
                entrieChannel: true,

                eventType: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                eventDate: 'desc'
            }
        });

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async delete(entrieId: string) {
        try {
            await prisma.entries.delete({
                where: { id: entrieId }
            });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export const entrieService = new EntrieService();
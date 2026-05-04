import { prisma } from "../lib/prisma";
import { EventType } from "../types/database-tables.type";

class EventTypeService {

    async create(data: EventType) {
        try {
            return await prisma.eventType.create({ data });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAll() {
        try {
            return await prisma.eventType.findMany({
                orderBy: { name: 'asc' }
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async delete(id: number) {
        try {
            await prisma.eventType.delete({
                where: { id }
            });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export const eventTypeService = new EventTypeService();
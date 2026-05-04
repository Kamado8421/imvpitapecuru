import { prisma } from "../lib/prisma";
import { OutflowsCategoryType } from "../types/database-tables.type";

class OutflowsCategoryService {

    async create(data: OutflowsCategoryType) {
        try {
            return await prisma.outflowsCategory.create({ data });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAll() {
        try {
            return await prisma.outflowsCategory.findMany({
                orderBy: { name: 'asc' }
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async delete(id: number) {
        try {
            await prisma.outflowsCategory.delete({
                where: { id }
            });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export const outflowsCategoryService = new OutflowsCategoryService();
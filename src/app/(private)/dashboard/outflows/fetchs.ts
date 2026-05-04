import { OutflowsCategoryType, OutflowsType } from "@/app/api/server/types/database-tables.type";

export async function createOutflow(data: OutflowsType) {
    try {
        const response = await fetch("/api/outflows", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        });

        const result = await response.json() as OutflowsType;

        if (!response.ok) {
            throw new Error("Erro ao criar saída");
        }

        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getOutflowsCategories() {
    try {
        const response = await fetch("/api/outflows-category", {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar categorias");
        }

        return await response.json() as OutflowsCategoryType[];

    } catch (error) {
        console.log(error);
        return [];
    }
}
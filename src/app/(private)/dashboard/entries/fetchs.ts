import { EntriesType, EventType } from "@/app/api/server/types/database-tables.type";

const API_URL = "/api";

export async function getEventTypes() {
    try {
        const response = await fetch(`${API_URL}/event-types`, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar tipos de evento");
        }

        return await response.json() as EventType[];

    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function createEntrie(data: EntriesType) {
    try {
        const response = await fetch(`${API_URL}/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        });

        const result = await response.json() as EntriesType;

        if (!response.ok) {
            throw new Error("Erro ao criar entrada");
        }

        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
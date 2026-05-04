
const API_URL = "/api";
export type EntrieWithEventType = {
    id: string;
    eventDate: string; // ISO string
    value: number;
    entrieType: "DIZIMO" | "OFERTA";
    entrieChannel: "PIX" | "ESPECIE";
    eventType: {
        id: number;
        name: string;
    };
};

export type OutflowWithCategory = {
    id: string;
    description: string;
    value: number;
    dateOutflow: string; // ISO string
    category: {
        id: number;
        name: string;
    };
};

/**
 * 📥 Buscar todas as entradas do mês atual
 */
export async function getCurrentMonthEntries() {
    try {
        const response = await fetch(`${API_URL}/entries`, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar entradas");
        }

        return await response.json() as EntrieWithEventType[];

    } catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * 📤 Buscar todas as saídas do mês atual
 */
export async function getCurrentMonthOutflows() {
    try {
        const response = await fetch(`${API_URL}/outflows`, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar saídas");
        }

        return await response.json();

    } catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * 🗑️ Deletar entrada por ID
 */
export async function deleteEntrieById(id: string) {
    try {
        const response = await fetch(`${API_URL}/entries/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        const result = await response.json() as OutflowWithCategory[];

        if (!response.ok) {
            throw new Error("Erro ao deletar entrada");
        }

        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * 🗑️ Deletar saída por ID
 */
export async function deleteOutflowById(id: string) {
    try {
        const response = await fetch(`${API_URL}/outflows/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result?.error || "Erro ao deletar saída");
        }

        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
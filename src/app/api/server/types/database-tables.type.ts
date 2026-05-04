export type UserType = {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
    image?: string;
    isAdmin?: boolean;
    createdAt?: string;
    updatedAt?: string;
    status?: 'ACTIVE' | 'INACTIVE'
    role?: 'TREASURER' | 'SUPER_ADMIN' | 'DEVELOPER'
}

export type EntriesType = {
    id?: string;
    eventTypeId: number;
    eventDate: string;
    value: number;
    entrieType: 'DIZIMO' | 'OFERTA' | 'GERAIS';
    entrieChannel: 'PIX' | 'ESPECIE';
};

export type OutflowsType = {
    id?: string;
    description: string;
    categoryId: number;
    value: number;
    dateOutflow: string;
}

export type EventType = {
    name: string;
    id?: number;
}

export type OutflowsCategoryType = {
    name: string;
    id?: number;
}
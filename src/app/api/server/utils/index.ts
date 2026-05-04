export function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(value);
}

export function getCurrentMonthYear() {
    const now = new Date();

    const formatted = new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric"
    }).format(now);

    // Deixar a primeira letra maiúscula (opcional)
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
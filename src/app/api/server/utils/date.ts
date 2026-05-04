export function isSameMonthAndYear(date: Date) {
    const now = new Date();

    return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    );
}

export function formatDateToBR(dateString: string) {
    const date = new Date(dateString);

    const formatted = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long"
    }).format(date);

    // Capitalizar mês
    const [day, , month] = formatted.split(" ");
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    return `${day} de ${capitalizedMonth}`;
}
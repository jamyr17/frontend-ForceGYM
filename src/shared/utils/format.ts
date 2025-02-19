export const formatDate = (date : Date) => {
    return new Intl.DateTimeFormat(
        'es-ES', {
            year: 'numeric', 
            month: '2-digit',
            day: '2-digit'
        }).format(date)
}

export const formatDateForParam = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Asegura que el mes tenga 2 dígitos
    const day = date.getDate().toString().padStart(2, '0'); // Asegura que el día tenga 2 dígitos
    
    return `${year}-${month}-${day}`;
}

export const formatAmountToCRC = (amount: number) => {
    return '₡' + amount.toLocaleString('es-CR');
};
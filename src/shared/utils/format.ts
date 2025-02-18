export const formatDate = (date : Date) => {
    return new Intl.DateTimeFormat(
        'es-ES', {
            year: 'numeric', 
            month: '2-digit',
            day: '2-digit'
        }).format(date)
}
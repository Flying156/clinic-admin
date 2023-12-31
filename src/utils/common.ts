export const getPageOffset = (page: number, limit: number) => {
    return (page - 1) * limit;
}
export const formatNumber = (nombre,decimals) => {
    if (nombre)
        return Number.parseFloat(nombre).toFixed(decimals);
    return 0
}
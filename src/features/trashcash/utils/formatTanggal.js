export const formatTanggal = (dateStr) => {
    const date = new Date(dateStr);

    return `${date.getDate()} ${date.toLocaleString("id-ID", {
        month: "long",
    })} ${date.getFullYear()}`;
};
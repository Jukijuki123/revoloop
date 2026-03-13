export const generateKodeTransaksi = () => {
    const now = new Date();

    const rand = Math.floor(Math.random() * 999)
        .toString()
        .padStart(3, "0");

    return `TRX-${now.getFullYear()}${(now.getMonth()+1)
        .toString()
        .padStart(2,"0")}${now
        .getDate()
        .toString()
        .padStart(2,"0")}-${rand}`;
};
import { useMemo, useState } from "react";
import { useEffect } from "react";

import MapPicker from "./components/MapPicker";
import TrashForm from "./components/TrashForm";
import TrashPopup from "./components/TrashPopup";

import { hargaPerKg } from "./utils/hargaSampah";
import { generateKodeTransaksi } from "./utils/generateKode";
import { formatTanggal } from "./utils/formatTanggal";

export default function TrashCashPage() {
    const todayStr = new Date().toISOString().split("T")[0];

    const [selectedBank, setSelectedBank] = useState(null);

    const [jenis, setJenis] = useState("");
    const [jumlah, setJumlah] = useState(1);
    const [lokasi, setLokasi] = useState("");
    const [tanggal, setTanggal] = useState(todayStr);
    const [waktu, setWaktu] = useState("");

    const [popupOpen, setPopupOpen] = useState(false);
    const [kodeTransaksi, setKodeTransaksi] = useState("");
    const [detail, setDetail] = useState({});

    useEffect(() => {
    if (selectedBank) {
        setLokasi(selectedBank.nama);
    }
    }, [selectedBank]);

    const timeSlots = useMemo(() => {
        const slots = [];
        for (let h = 8; h <= 16; h++) {
        slots.push(`${h.toString().padStart(2, "0")}:00`);
        }
        return slots;
    }, []);

    const handleChangeLocation = () => {
        setSelectedBank(null);
        setJenis("");
        setJumlah(1);
        setLokasi("");
        setWaktu("");
    };

    const handleSubmit = () => {
        if (!jenis || !lokasi || !tanggal || !waktu) {
        alert("Lengkapi semua field.");
        return;
        }

        const harga = jumlah * (hargaPerKg[jenis] || 0);

        const formattedHarga = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        }).format(harga);

        const kode = generateKodeTransaksi();

        const transaksi = {
        kode,
        jenis,
        jumlah: `${jumlah} kg`,
        lokasi,
        jadwal: `${formatTanggal(tanggal)} ${waktu}`,
        harga: formattedHarga,
        };

        const history =
        JSON.parse(localStorage.getItem("earthline_trashcash")) || [];

        history.push(transaksi);

        localStorage.setItem("earthline_trashcash", JSON.stringify(history));

        setDetail(transaksi);
        setKodeTransaksi(kode);
        setPopupOpen(true);
    };

    if (!selectedBank) {
        return <MapPicker onSelect={(bank) => setSelectedBank(bank)} />;
    }

    return (
        <>
        <TrashForm
            jenis={jenis}
            setJenis={setJenis}
            jumlah={jumlah}
            setJumlah={setJumlah}
            lokasi={lokasi}
            setLokasi={setLokasi}
            tanggal={tanggal}
            setTanggal={setTanggal}
            waktu={waktu}
            setWaktu={setWaktu}
            timeSlots={timeSlots}
            handleSubmit={handleSubmit}
            selectedBank={selectedBank}
            onChangeLocation={handleChangeLocation}
        />

        <TrashPopup
            popupOpen={popupOpen}
            setPopupOpen={setPopupOpen}
            kodeTransaksi={kodeTransaksi}
            detail={detail}
        />
        </>
    );
}
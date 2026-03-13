    "use client";
    import React, { useEffect, useRef, useState } from "react";
    import { MessageCircle, Bot, X, Send } from "lucide-react";

    // ========================================
    // Data bot — keyword lebih lengkap & variatif
    // ========================================

    const botData = [
    {
        keywords: [
        "halo", "hai", "hello", "hi", "hei", "hey",
        "selamat", "pagi", "siang", "sore", "malam", "permisi", "holla"
        ],
        answer: "Halo! Selamat datang di EarthLine 🌱\nAda yang bisa saya bantu?",
    },
    {
        keywords: [
        "apa itu earthline", "earthline itu apa", "earthline",
        "platform ini", "website ini", "tentang earthline",
        "ini apa", "apaan ini", "jelasin earthline"
        ],
        answer:
        "EarthLine adalah platform digital untuk edukasi dan pengelolaan sampah secara modern. Kamu bisa belajar memilah, menukar sampah, dan melihat produk daur ulang — semuanya di satu tempat!",
    },
    {
        keywords: [
        "cara kerja", "gimana sistemnya", "gimana cara kerja",
        "sistem earthline", "alurnya gimana", "langkah langkah",
        "prosesnya", "mekanisme", "cara pakainya", "bagaimana caranya"
        ],
        answer:
        "Cara kerja EarthLine:\n1️⃣ Kumpulkan sampah di rumah\n2️⃣ Isi detail sampah di fitur Tukar Sampah\n3️⃣ Antar ke bank sampah terdekat\n4️⃣ Dapatkan uang & poin hijau! 💰",
    },
    {
        keywords: [
        "jual sampah", "tukar sampah", "penukaran", "mau jual",
        "bisa jual", "jualin sampah", "nukar sampah", "gimana jual",
        "cara jual", "jual plastik", "jual kertas", "jual logam",
        "jual kaca", "jual organik", "sampah bisa dijual", "hasilkan uang"
        ],
        answer:
        "Untuk menjual sampah:\n1️⃣ Buka fitur Tukar Sampah\n2️⃣ Pilih jenis & jumlah sampah\n3️⃣ Pilih lokasi bank sampah\n4️⃣ Tentukan jadwal antar\n5️⃣ Datang & dapatkan uang! 💵",
    },
    {
        keywords: [
        "harga", "berapa harga", "harga sampah", "tarif", "bayaran",
        "dibayar berapa", "nilai sampah", "rate", "harganya",
        "plastik berapa", "kertas berapa", "logam berapa", "kaca berapa", "organik berapa"
        ],
        answer:
        "Estimasi harga sampah per kg:\n♻️ Plastik  : Rp 5.000\n📄 Kertas   : Rp 3.000\n🔩 Logam    : Rp 15.000\n🪟 Kaca     : Rp 2.000\n🌿 Organik  : Rp 1.000\n\nHarga bisa berbeda tergantung lokasi bank sampah.",
    },
    {
        keywords: [
        "lokasi", "bank sampah", "tempat", "di mana", "dimana",
        "alamat", "letak", "bank sampah terdekat", "tempat tukar",
        "drop point", "titik pengumpulan", "area", "daerah mana"
        ],
        answer:
        "Untuk menemukan bank sampah terdekat, kamu bisa buka fitur Tukar Sampah lalu aktifkan GPS. Sistem akan otomatis mendeteksi bank sampah paling dekat dari lokasimu! 📍",
    },
    {
        keywords: [
        "edukasi", "belajar", "cara mengolah", "cara memilah",
        "pilah sampah", "daur ulang", "recycle", "reduce", "reuse",
        "pengetahuan", "info sampah", "artikel", "tips sampah",
        "kerajinan", "sampah organik", "sampah anorganik"
        ],
        answer:
        "Di halaman Edukasi kamu bisa belajar:\n📚 Cara memilah sampah dengan benar\n♻️ Proses daur ulang berbagai jenis sampah\n🎨 Inspirasi kerajinan dari sampah\n🌍 Tips menjaga lingkungan sehari-hari",
    },
    {
        keywords: [
        "poin", "poin hijau", "reward", "hadiah", "bonus",
        "koin", "point", "penghargaan", "dapat apa", "keuntungan"
        ],
        answer:
        "Selain uang tunai, kamu juga mendapatkan Poin Hijau setiap kali menukar sampah! 🌿\nPoin Hijau adalah bentuk apresiasi EarthLine atas kontribusimu menjaga lingkungan.",
    },
    {
        keywords: [
        "daftar", "registrasi", "buat akun", "sign up", "register",
        "belum punya akun", "cara daftar", "gabung", "join"
        ],
        answer:
        "Untuk bergabung di EarthLine, kamu bisa klik tombol Daftar di halaman utama dan isi data dirimu. Gratis dan mudah! 🙌",
    },
    {
        keywords: [
        "terima kasih", "thanks", "makasih", "thx", "tengkyu",
        "thank you", "tq", "trims", "terimakasih"
        ],
        answer: "Sama-sama! Senang bisa membantu 😊\nJangan ragu bertanya lagi ya!",
    },
    {
        keywords: [
        "bye", "dadah", "sampai jumpa", "selamat tinggal",
        "pamit", "cabut", "keluar", "tutup"
        ],
        answer: "Sampai jumpa! Jaga lingkungan ya 🌍💚",
    },
    ];

    const QUICK_REPLIES = [
    "Cara jual sampah",
    "Harga sampah",
    "Lokasi bank sampah",
    "Apa itu EarthLine?",
    ];

    // ========================================
    // Matching engine — lebih toleran typo & variasi
    // ========================================

    const getBotResponse = (input) => {
    const clean = input.toLowerCase().trim();

    // 1. Exact / partial keyword match
    for (const item of botData) {
        if (item.keywords.some((key) => clean.includes(key))) {
        return item.answer;
        }
    }

    // 2. Fallback — pecah per kata, cari minimal 1 kata yang cocok
    const words = clean.split(/\s+/);
    for (const item of botData) {
        const allKeywordWords = item.keywords.flatMap((k) => k.split(/\s+/));
        if (words.some((w) => w.length > 3 && allKeywordWords.includes(w))) {
        return item.answer;
        }
    }

    return "Maaf, aku belum punya jawaban untuk itu 😊\nCoba tanyakan seputar cara jual sampah, harga, atau lokasi bank sampah ya!";
    };

    // ========================================
    // Komponen utama
    // ========================================

    const INITIAL_MESSAGE = {
    id: 1,
    sender: "bot",
    text: "Halo! Saya EarthLineBot 🌱\nAda yang bisa saya bantu?\n\nPilih pertanyaan di bawah atau ketik sendiri ya!",
    };

    const Chatbot = () => {
    const [isOpen,    setIsOpen]    = useState(false);
    const [input,     setInput]     = useState("");
    const [isTyping,  setIsTyping]  = useState(false);
    const [messages,  setMessages]  = useState([INITIAL_MESSAGE]);
    const [showQuickReplies, setShowQuickReplies] = useState(true);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const sendMessage = (text) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        // Sembunyikan quick replies setelah user kirim pesan pertama
        setShowQuickReplies(false);

        const userMsg = { id: Date.now(), sender: "user", text: trimmed };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
        const botText = getBotResponse(trimmed);
        setIsTyping(false);
        setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "bot", text: botText }]);
        }, 700);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
        e.preventDefault();
        sendMessage(input);
        }
    };

    const handleReset = () => {
        setMessages([INITIAL_MESSAGE]);
        setShowQuickReplies(true);
        setInput("");
    };

    return (
        <>
        {/* Tombol buka chatbot */}
        <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="fixed bottom-6 right-6 bg-primary-dark text-white p-4 rounded-full shadow-lg hover:bg-primary cursor-pointer transition z-40"
            aria-label="Buka chatbot"
        >
            <MessageCircle className="w-6 h-6" />
        </button>

        {/* Chatbot window */}
        {isOpen && (
            <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-white shadow-xl rounded-xl flex flex-col border border-primary-dark z-50">

            {/* Header */}
            <div className="bg-primary-dark text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
                <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <div>
                    <p className="font-semibold text-sm leading-tight">EarthLine Bot</p>
                    <p className="text-xs opacity-70 leading-tight">Asisten virtual EarthLine</p>
                </div>
                </div>
                <div className="flex items-center gap-2">
                {/* Tombol reset */}
                <button
                    type="button"
                    onClick={handleReset}
                    className="text-white opacity-70 hover:opacity-100 transition text-xs border border-white/40 rounded px-1.5 py-0.5 cursor-pointer"
                    aria-label="Reset chat"
                >
                    Reset
                </button>
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200 cursor-pointer"
                    aria-label="Tutup chatbot"
                >
                    <X className="w-4 h-4" />
                </button>
                </div>
            </div>

            {/* Chat area */}
            <div className="p-3 h-80 overflow-y-auto space-y-2 text-sm">
                {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={
                    msg.sender === "bot"
                        ? "bg-green-100 text-primary-dark p-2 rounded-lg w-fit max-w-[80%] whitespace-pre-line"
                        : "bg-primary-dark text-white p-2 rounded-lg w-fit max-w-[80%] ml-auto whitespace-pre-line"
                    }
                >
                    {msg.text}
                </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                <div className="bg-green-100 text-primary-dark p-2.5 rounded-lg w-fit">
                    <span className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                </div>
                )}

                {/* Quick reply buttons */}
                {showQuickReplies && !isTyping && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {QUICK_REPLIES.map((q) => (
                    <button
                        key={q}
                        type="button"
                        onClick={() => sendMessage(q)}
                        className="text-xs border border-primary-dark text-primary-dark px-2.5 py-1 rounded-full hover:bg-green-50 transition cursor-pointer"
                    >
                        {q}
                    </button>
                    ))}
                </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 border-t flex gap-2">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border border-primary-dark rounded-lg px-3 py-2 text-sm focus:outline-none"
                placeholder="Tanyakan sesuatu..."
                />
                <button
                type="button"
                onClick={() => sendMessage(input)}
                className="bg-primary-dark text-white px-3 py-2 rounded-lg hover:bg-primary flex items-center justify-center cursor-pointer transition"
                >
                <Send className="w-4 h-4" />
                </button>
            </div>
            </div>
        )}
        </>
    );
    };

    export default Chatbot;
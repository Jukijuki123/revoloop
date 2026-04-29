"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Coins, LogOut, ChevronDown, History, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "TrashCash", href: "/trashcash" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  // ── Fetch user ──────────────────────────────────────────────────────────
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user ?? null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUser();
    window.addEventListener("user-updated", fetchUser);
    return () => window.removeEventListener("user-updated", fetchUser);
  }, []);

  // ── Scroll shadow ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close on resize & route change ──────────────────────────────────────
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // ── Click outside dropdown ───────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setDropdownOpen(false);
    window.dispatchEvent(new Event("user-updated"));
    router.push("/");
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const getInitial = (name) => name?.charAt(0).toUpperCase() ?? "U";

  return (
    <header
      className={`fixed w-full top-0 left-0 z-40 transition-all duration-300 ${scrolled
        ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100"
        : "bg-white"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* logo revoloop */}
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setMobileOpen(false)}>
            <div className="relative rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Image
                src="/images/logorevoloop.svg"
                alt="Logo"
                width={25}
                height={25}
                className=""
                priority // logo utama harus cepet nongol
              />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-primary-dark">
              REVO<span className="text-secondary">LOOP</span>
            </span>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${isActive(item.href)
                  ? "text-primary-dark"
                  : "text-gray-600 hover:text-primary"
                  }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary-dark rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Auth / Profile ────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            {loadingUser ? (
              <div className="w-24 h-8 bg-gray-100 animate-pulse rounded-full" />
            ) : user ? (
              <div className="flex items-center gap-3" ref={dropdownRef}>
                {/* Coin Badge */}
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-full text-sm font-bold">
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  <span>{(user.poinHijau ?? 0).toLocaleString("id-ID")}</span>
                </div>

                {/* Profile Button */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-gray-100 transition focus:outline-none"
                  >
                    <div className="w-8 h-8 bg-linear-to-br from-primary-dark to-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                      {getInitial(user.name)}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        {/* User Info */}
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                          <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                        {/* Menu Items */}
                        <div className="py-1">
                          <Link
                            href="/riwayat"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                          >
                            <History className="w-4 h-4 text-gray-400" />
                            Riwayat Transaksi
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                          >
                            <LogOut className="w-4 h-4" />
                            Keluar
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="text-sm font-semibold text-gray-600 hover:text-primary-dark px-4 py-2 rounded-xl hover:bg-gray-50 transition"
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm font-bold bg-primary-dark hover:bg-green-800 text-white px-4 py-2 rounded-xl transition shadow-sm"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* ── Hamburger ─────────────────────────────────────────── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition text-gray-600"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-5 h-5" /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition ${isActive(item.href)
                    ? "bg-primary-dark/8 text-primary-dark"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary-dark"
                    }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="ml-auto w-2 h-2 bg-primary-dark rounded-full" />
                  )}
                </Link>
              ))}

              {/* Mobile Auth */}
              <div className="pt-3 border-t border-gray-100 mt-3">
                {user ? (
                  <div className="space-y-2">
                    {/* User card */}
                    <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl">
                      <div className="w-9 h-9 bg-linear-to-br from-primary-dark to-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {getInitial(user.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold">
                        <Coins className="w-3 h-3" />
                        {user.poinHijau ?? 0}
                      </div>
                    </div>
                    <Link href="/riwayat" className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                      <History className="w-4 h-4 text-gray-400" /> Riwayat Transaksi
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl hover:bg-red-100 transition"
                    >
                      <LogOut className="w-4 h-4" /> Keluar
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/auth/login" className="text-center py-3 text-sm font-bold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                      Masuk
                    </Link>
                    <Link href="/auth/register" className="text-center py-3 text-sm font-bold bg-primary-dark text-white rounded-xl hover:bg-green-800 transition shadow-sm">
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
